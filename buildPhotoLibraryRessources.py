#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Build ressources to be used by Flowtos.

Those ressources include optimized images, thumbnails and, properties files.

Note:   plr (PLR) stands for photo library ressources
        ssr (SSR) stands for server side renders
"""

import os
import glob
import json
import shutil
import base64
from io import BytesIO

from PIL import Image
from progress.bar import Bar

import bplrh_helpers.tools
import bplrh_helpers.server_side_renders
import bplrh_helpers.credits

config = {
    'flowtos_baseurl': 'https://giovanetti.fr/flowtos/',
    'package_path': './package.json',
    'supported_photo_types': ['.webp', '.jpeg', 'JPG', 'jpg', 'JPEG', 'png', 'PNG'],
    'sources': {
        'photos_path': './original_ressources/photos/',
        'models_path': './original_ressources/credits/models/',
        'ssr_default_image_path': './original_ressources/ssr/default_image.webp'
    },
    'plr': {
        'main_folder_name': 'photo-library-ressources',
        'main_folder_path': './public/photo-library-ressources/',
        'photos_folder_name': 'photos',
        'thumbnails_folder_name': 'thumbnails',
        'models_folder_name': 'models',
        'index_name': 'index.json',
        'max_dimensions': {
            'thumbnail': (800, 500),
            'thumbnail_2x': (1600, 1000),
            'photo': (1280, 1280),
            'photo_2x': (2560, 2560),
            'model': (125, 125),
            'model_2x': (250, 250),
            'blurred_thumbnail_placeholder': (10, 10)
        }
    },
    'ssr': {
        'photos': {
            'render_template_path': './bplrh_helpers/ressources/ssr-photo-template.html',
            'htaccess_template_path': './bplrh_helpers/ressources/ssr-photos-htaccess',
            'destination_path': './public/photos/',
            'index_template_path': './bplrh_helpers/ressources/ssr-photos-index-template.html'
        },
        'albums': {
            'render_template_path': './bplrh_helpers/ressources/ssr-album-template.html',
            'htaccess_template_path': './bplrh_helpers/ressources/ssr-albums-htaccess',
            'destination_path': './public/albums/',
            'index_template_path': './bplrh_helpers/ressources/ssr-albums-index-template.html'
        },
        'photos_in_albums': {
            'render_template_path': './bplrh_helpers/ressources/ssr-photo-in-album.html'
        },
        'about': {
            'render_template_path': './bplrh_helpers/ressources/ssr-about.html',
            'destination_path': './public/about/'
        }
    }
}


def reset_photo_library_ressources():
    print("Reset photo library ressources...")
    if os.path.exists(config['plr']['main_folder_path']) and os.path.isdir(config['plr']['main_folder_path']):
        shutil.rmtree(config['plr']['main_folder_path'])
    os.mkdir(config['plr']['main_folder_path'])
    os.mkdir(config['plr']['main_folder_path'] +
             config['plr']['thumbnails_folder_name'])
    os.mkdir(config['plr']['main_folder_path'] +
             config['plr']['photos_folder_name'])

    bplrh_helpers.credits.reset(config)
    bplrh_helpers.server_side_renders.reset(config)


def load_package_file():
    with open(config['package_path']) as json_file:
        return json.load(json_file)


def build_photos_folder_mapping():
    photos_folder_mapping = {'allPhotos': [], 'albums': {}}
    photo_id = 0
    photos_grabbed = []

    for supported_photo_type in config['supported_photo_types']:
        pathname = config['sources']['photos_path'] + \
            '**/*' + supported_photo_type
        photos_grabbed.extend(
            glob.glob(pathname, recursive=True))

    photos_grabbed.sort(key=os.path.getmtime, reverse=True)
    for photo_path in photos_grabbed:
        photo_id = bplrh_helpers.tools.md5(photo_path)
        photo_folder_tree_element = {'id': photo_id, 'path': photo_path}
        photos_folder_mapping['allPhotos'].append(photo_folder_tree_element)

        splitted_photo_path_in_photos_folder_path = photo_path[len(
            config['sources']['photos_path']):len(photo_path)].split('/')
        if len(splitted_photo_path_in_photos_folder_path) == 2:
            album_name = splitted_photo_path_in_photos_folder_path[0]
            if album_name not in photos_folder_mapping['albums']:
                photos_folder_mapping['albums'][album_name] = {'photos': []}
            photos_folder_mapping['albums'][album_name]['photos'].append(
                photo_folder_tree_element)

    return photos_folder_mapping


def build_optimized_images(photos_folder_mapping):
    optimized_images_metadata = {}
    for photo in photos_folder_mapping['allPhotos']:
        optimized_images_metadata[photo['id']] = {
            'photo': {
                'width': 0,
                'height': 0,
            },
            'photo2x': {
                'width': 0,
                'height': 0,
            },
            'thumbnail': {
                'width': 0,
                'height': 0,
            },
            'thumbnail2x': {
                'width': 0,
                'height': 0,
            },
        }

    bar = Bar('Processing images', max=len(
        photos_folder_mapping['allPhotos']) * 4)
    
    for photo in photos_folder_mapping['allPhotos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(config['plr']['max_dimensions']['thumbnail'])

            if im.mode == 'RGBA':
                im = im.convert('RGB')

            width, height = im.size
            optimized_images_metadata[photo['id']]['thumbnail']['width'] = width
            optimized_images_metadata[photo['id']]['thumbnail']['height'] = height

            im.save(config['plr']['main_folder_path'] +
                    config['plr']['thumbnails_folder_name'] + '/' + str(photo['id']) + '.webp', "WEBP", optimize=True)
        except IOError:
            print("Cannot create thumbnail for photo ", photo['path'])
        bar.next()

    for photo in photos_folder_mapping['allPhotos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(config['plr']['max_dimensions']['thumbnail_2x'])

            if im.mode == 'RGBA':
                im = im.convert('RGB')

            width, height = im.size
            optimized_images_metadata[photo['id']]['thumbnail2x']['width'] = width
            optimized_images_metadata[photo['id']]['thumbnail2x']['height'] = height

            im.save(config['plr']['main_folder_path'] +
                    config['plr']['thumbnails_folder_name'] + '/' + str(photo['id']) + '@2x.webp', "WEBP", optimize=True)
        except IOError:
            print("Cannot create @2x thumbnail for photo ", photo['path'])
        bar.next()

    for photo in photos_folder_mapping['allPhotos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(config['plr']['max_dimensions']['photo'])

            if im.mode == 'RGBA':
                im = im.convert('RGB')

            width, height = im.size
            optimized_images_metadata[photo['id']]['photo']['width'] = width
            optimized_images_metadata[photo['id']]['photo']['height'] = height

            im.save(config['plr']['main_folder_path'] +
                    config['plr']['photos_folder_name'] + '/' + str(photo['id']) + '.webp', "WEBP", optimize=True)
        except IOError:
            print("Cannot create resized photo of ", photo['path'])
        bar.next()

    for photo in photos_folder_mapping['allPhotos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(config['plr']['max_dimensions']['photo_2x'])

            if im.mode == 'RGBA':
                im = im.convert('RGB')

            width, height = im.size
            optimized_images_metadata[photo['id']]['photo2x']['width'] = width
            optimized_images_metadata[photo['id']]['photo2x']['height'] = height

            im.save(config['plr']['main_folder_path'] +
                    config['plr']['photos_folder_name'] + '/' + str(photo['id']) + '@2x.webp', "WEBP", optimize=True)
        except IOError:
            print("Cannot create @2x resized photo of ", photo['path'])
        bar.next()

    return optimized_images_metadata


# https://stackoverflow.com/questions/31826335/how-to-convert-pil-image-image-object-to-base64-string
def get_blurred_thumbnail_placeholder_base64(photo):
    try:
        im = Image.open(photo['path'])
        im.thumbnail(config['plr']['max_dimensions']
                     ['blurred_thumbnail_placeholder'])
        buffered = BytesIO()

        if im.mode == 'RGBA':
            im = im.convert('RGB')
        im.save(buffered, "WEBP", quality=40)
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        img_str = 'data:image/jpg;base64,' + img_str

        return img_str

    except IOError:
        print(
            "Cannot create blurred thumbnail placeholder for photo ", photo['path'])


def build_index_file(photos_folder_mapping, optimized_images_metadata, credits_index):
    print("\nWriting index file")
    index_file = {'sharedPhotosData': [],'allPhotos': [], 'albums': [], 'credits': credits_index}
    shared_photos_data_index = {}

    already_added_photo_elt = []
    for photo in photos_folder_mapping['allPhotos']:
        photo_elt = {
            'id': photo['id'],
            'photo': {
                'url': config['plr']['photos_folder_name'] + '/' + str(photo['id']) + '.webp',
                'width': optimized_images_metadata[photo['id']]['photo']['width'],
                'height': optimized_images_metadata[photo['id']]['photo']['height'],
            },
            'photo2x': {
                'url': config['plr']['photos_folder_name'] + '/' + str(photo['id']) + '@2x.webp',
                'width': optimized_images_metadata[photo['id']]['photo2x']['width'],
                'height': optimized_images_metadata[photo['id']]['photo2x']['height'],
            },
            'thumbnail': {
                'url': config['plr']['thumbnails_folder_name'] + '/' + str(photo['id']) + '.webp',
                'width': optimized_images_metadata[photo['id']]['thumbnail']['width'],
                'height': optimized_images_metadata[photo['id']]['thumbnail']['height'],
            },
            'thumbnail2x': {
                'url': config['plr']['thumbnails_folder_name'] + '/' + str(photo['id']) + '@2x.webp',
                'width': optimized_images_metadata[photo['id']]['thumbnail2x']['width'],
                'height': optimized_images_metadata[photo['id']]['thumbnail2x']['height'],
            },
            'blurredThumbnailPlaceholderUrl': get_blurred_thumbnail_placeholder_base64(photo),
        }

        if photo['id'] not in already_added_photo_elt:
            index_file['sharedPhotosData'].append(photo_elt)
            shared_photos_data_index[photo['id']] = len(index_file['sharedPhotosData']) - 1
            already_added_photo_elt.append(photo['id'])


    already_added_photo_elt = []
    for photo in photos_folder_mapping['allPhotos']:
        photo_elt = {
            'sharedPhotosDataIndex': shared_photos_data_index[photo['id']]
        }

        if photo['id'] not in already_added_photo_elt:
            index_file['allPhotos'].append(photo_elt)
            already_added_photo_elt.append(photo['id'])

    for album in photos_folder_mapping['albums']:
        album_photos = []
        album_encoded_name = bplrh_helpers.tools.encode_album_name(album)
        for photo in photos_folder_mapping['albums'][album]['photos']:
            photo_elt = {
                'sharedPhotosDataIndex': shared_photos_data_index[photo['id']]
            }
            album_photos.append(photo_elt)
        index_file['albums'].append({'name': album, 'encodedName': album_encoded_name, 'photos': album_photos})

    with open(config['plr']['main_folder_path'] + config['plr']['index_name'], 'w') as outfile:
        json.dump(index_file, outfile)


def add_default_og_image(photos_folder_mapping):
    default_og_image_path = photos_folder_mapping['allPhotos'][0]['path']
    if os.path.exists(config['sources']['ssr_default_image_path']):
        default_og_image_path = config['sources']['ssr_default_image_path']

    try:
        im = Image.open(default_og_image_path)
        im.thumbnail(config['plr']['max_dimensions']['photo'])
        if im.mode == 'RGBA':
            im = im.convert('RGB')
        im.save(config['plr']['main_folder_path'] +
                '/indexOGImage.webp', "WEBP")
    except IOError:
        print("Cannot create default open graph image.")


def build_photo_library_ressources():
    reset_photo_library_ressources()
    package_file = load_package_file()
    flowtos_version = package_file['version']
    print("Building photo library ressources for Flowtos version: ", flowtos_version)
    photos_folder_mapping = build_photos_folder_mapping()
    optimized_images_metadata = build_optimized_images(photos_folder_mapping)
    credits_index = bplrh_helpers.credits.build(config)
    build_index_file(photos_folder_mapping, optimized_images_metadata, credits_index)
    bplrh_helpers.server_side_renders.build(photos_folder_mapping, config)
    add_default_og_image(photos_folder_mapping)
    print("\nDone")


if __name__ == '__main__':
    build_photo_library_ressources()
