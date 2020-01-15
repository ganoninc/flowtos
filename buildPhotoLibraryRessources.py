#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Build ressources to be used by Flowtos.

Those ressources include optimized images, thumbnails and, properties files.
"""

import os
import glob
import json
import shutil
import hashlib

from PIL import Image
from progress.bar import Bar

FLOWTOS_BASEURL = 'https://giovanetti.fr/flowtos/'
PACKAGE_FILE_PATH = './package.json'
BASIC_PHOTO_SERVER_SIDE_RENDER_TEMPLATE_FILE_PATH = './photo-ssr-template.html'
BASIC_PHOTO_SERVER_SIDE_RENDER_HTACCESS_FILE_PATH = './photo-ssr-htaccess'
PHOTOS_FOLDER_PATH = './photos/'
SUPPORTED_PHOTO_TYPES = ['.jpg']
PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME = 'photo-library-ressources'
BASIC_PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH = './public/photos/'
PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH = './public/' + \
    PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME + '/'
PHOTO_LIBRARY_RESSOURCES_BASE_URL = './' + PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME + '/'
PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME = 'thumbnails'
PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME = 'photos'
PHOTO_LIBRARY_RESSOURCES_PHOTO_INDEX_NAME = 'index.json'
MAX_THUMBNAIL_DIMENSION = (400, 400)
MAX_2X_THUMBNAIL_DIMENSION = (800, 800)
MAX_PHOTO_DIMENSION = (1280, 1280)
MAX_2X_PHOTO_DIMENSION = (2560, 2560)


def clean_and_init_photo_library_ressources_folders():
    # photo-library-ressources folder
    if os.path.exists(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH) and os.path.isdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH):
        shutil.rmtree(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH)
    os.mkdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH)
    os.mkdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
             PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME)
    os.mkdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
             PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME)
    # photos folder (basic server side renders)
    if os.path.exists(BASIC_PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH) and os.path.isdir(BASIC_PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH):
        shutil.rmtree(BASIC_PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH)
    os.mkdir(BASIC_PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH)



def load_package_file():
    with open(PACKAGE_FILE_PATH) as json_file:
        return json.load(json_file)


def build_photos_folder_mapping():
    photos_folder_mapping = {'all_photos': [], 'albums': {}}
    photo_id = 0
    photos_grabbed = []

    for supported_photo_type in SUPPORTED_PHOTO_TYPES:
        pathname = PHOTOS_FOLDER_PATH + '**/*' + supported_photo_type
        photos_grabbed.extend(
            glob.glob(pathname, recursive=True))

    for photo_path in photos_grabbed:
        photo_id = md5(photo_path)
        photo_folder_tree_element = {'id': photo_id, 'path': photo_path}
        photos_folder_mapping['all_photos'].append(photo_folder_tree_element)

        splitted_photo_path_in_photos_folder_path = photo_path[len(
            PHOTOS_FOLDER_PATH):len(photo_path)].split('/')
        if len(splitted_photo_path_in_photos_folder_path) == 2:
            album_name = splitted_photo_path_in_photos_folder_path[0]
            if album_name not in photos_folder_mapping['albums']:
                photos_folder_mapping['albums'][album_name] = {'photos': []}
            photos_folder_mapping['albums'][album_name]['photos'].append(
                photo_folder_tree_element)

    return photos_folder_mapping


def build_optimized_images(photos_folder_mapping):
    bar = Bar('Processing images', max=len(
        photos_folder_mapping['all_photos']) * 4)
    for photo in photos_folder_mapping['all_photos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(MAX_THUMBNAIL_DIMENSION)
            im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                    PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME + '/' + str(photo['id']) + '.jpg', "JPEG")
        except IOError:
            print("Cannot create thumbnail for photo ", photo['path'])
        bar.next()

    for photo in photos_folder_mapping['all_photos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(MAX_2X_THUMBNAIL_DIMENSION)
            im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                    PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg', "JPEG")
        except IOError:
            print("Cannot create @2x thumbnail for photo ", photo['path'])
        bar.next()

    for photo in photos_folder_mapping['all_photos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(MAX_PHOTO_DIMENSION)
            im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                    PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME + '/' + str(photo['id']) + '.jpg', "JPEG")
        except IOError:
            print("Cannot create resized photo of ", photo['path'])
        bar.next()

    for photo in photos_folder_mapping['all_photos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(MAX_2X_PHOTO_DIMENSION)
            im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                    PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg', "JPEG")
        except IOError:
            print("Cannot create @2x resized photo of ", photo['path'])
        bar.next()


def build_index_file(photos_folder_mapping):
    index_file = {'all_photos': [], 'albums': []}
    already_added_photo_elt = []
    for photo in photos_folder_mapping['all_photos']:
        im = Image.open(photo['path'])
        photo_width, photo_height = im.size
        photo_elt = {
            'id': photo['id'],
            'thumbnailUrl': PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
            'thumbnail2xUrl': PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
            'photoUrl': PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
            'photo2xUrl': PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
            'width': photo_width,
            'height': photo_height
        }

        if photo['id'] not in already_added_photo_elt:
            index_file['all_photos'].append(photo_elt)
            already_added_photo_elt.append(photo['id'])

    for album in photos_folder_mapping['albums']:
        album_photos = []
        for photo in photos_folder_mapping['albums'][album]['photos']:
            im = Image.open(photo['path'])
            photo_width, photo_height = im.size
            photo_elt = {
                'id': photo['id'],
                'thumbnailUrl': PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
                'thumbnail2xUrl': PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
                'photoUrl': PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
                'photo2xUrl': PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
                'width': photo_width,
                'height': photo_height
            }
            album_photos.append(photo_elt)
        index_file['albums'].append({'name': album, 'photos': album_photos})

    with open(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH + PHOTO_LIBRARY_RESSOURCES_PHOTO_INDEX_NAME, 'w') as outfile:
        json.dump(index_file, outfile)

# Method found on Stack Overflow - Generating an MD5 checksum of a file
# (https://stackoverflow.com/questions/3431825/generating-an-md5-checksum-of-a-file)
def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


def build_basic_server_side_renders(photos_folder_mapping):
    with open(BASIC_PHOTO_SERVER_SIDE_RENDER_TEMPLATE_FILE_PATH) as template:
        photo_server_side_render_template = template.read()
        for photo in photos_folder_mapping['all_photos']:
            photo_server_side_render = photo_server_side_render_template.replace(
                '{PHOTO_URL}', FLOWTOS_BASEURL + PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME + '/' + PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME + '/' + photo['id'] + '.jpg')
            photo_server_side_render = photo_server_side_render.replace(
                '{BASIC_SERVER_SIDE_RENDER_URL}', FLOWTOS_BASEURL + 'photos/' + photo['id'])
            
            with open(BASIC_PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH + photo['id'] + '.html', 'w+') as render:
                render.write(photo_server_side_render)

    with open(BASIC_PHOTO_SERVER_SIDE_RENDER_HTACCESS_FILE_PATH) as htaccess_source:
        with open(BASIC_PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH + '.htaccess', 'w+') as htaccess_destination:
            htaccess_destination.write(htaccess_source.read())


def build_photo_library_ressources():
    clean_and_init_photo_library_ressources_folders()
    package_file = load_package_file()
    flowtos_version = package_file['version']
    print("Building photo library ressources for Flowtos version: ", flowtos_version)
    photos_folder_mapping = build_photos_folder_mapping()
    build_optimized_images(photos_folder_mapping)
    build_index_file(photos_folder_mapping)
    build_basic_server_side_renders(photos_folder_mapping)
    print("\nDone")


if __name__ == '__main__':
    build_photo_library_ressources()
