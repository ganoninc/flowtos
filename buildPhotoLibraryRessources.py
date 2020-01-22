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
PHOTO_SERVER_SIDE_RENDER_TEMPLATE_FILE_PATH = './photo-ssr-template.html'
PHOTO_SERVER_SIDE_RENDER_HTACCESS_FILE_PATH = './photo-ssr-htaccess'
ALBUM_SERVER_SIDE_RENDER_TEMPLATE_FILE_PATH = './album-ssr-template.html'
ALBUM_SERVER_SIDE_RENDER_HTACCESS_FILE_PATH = './album-ssr-htaccess'
PHOTOS_FOLDER_PATH = './photos/'
SUPPORTED_PHOTO_TYPES = ['.jpg', '.jpeg', 'JPG', 'JPEG']
MODELS_FOLDER_PATH = './credits/models/'
PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME = 'photo-library-ressources'
PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH = './public/photos/'
ALBUM_SERVER_SIDE_RENDER_FOLDER_PATH = './public/albums/'
PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH = './public/' + \
    PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME + '/'
PHOTO_LIBRARY_RESSOURCES_BASE_URL = './' + PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME + '/'
PHOTO_LIBRARY_RESSOURCES_THUMBNAILS_FOLDER_NAME = 'thumbnails'
PHOTO_LIBRARY_RESSOURCES_BLURRED_THUMBNAIL_PLACEHOLDERS_FOLDER_NAME = 'blurred-thumbnail-placeholders'
PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME = 'photos'
PHOTO_LIBRARY_RESSOURCES_MODELS_FOLDER_NAME = 'models'
PHOTO_LIBRARY_RESSOURCES_PHOTOS_INDEX_NAME = 'index.json'
MAX_THUMBNAIL_DIMENSION = (400, 400)
MAX_2X_THUMBNAIL_DIMENSION = (800, 800)
MAX_PHOTO_DIMENSION = (1280, 1280)
MAX_2X_PHOTO_DIMENSION = (2560, 2560)
MODEL_THUMBNAIL_DIMENSION = (125, 125)
MODEL_2X_THUMBNAIL_DIMENSION = (250, 250)
MAX_BLURRED_THUMBNAIL_PLACEHOLDER_DIMENSION = (25, 25)


def clean_and_init_photo_library_ressources_folders():
    # photo-library-ressources folder
    if os.path.exists(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH) and os.path.isdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH):
        shutil.rmtree(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH)
    os.mkdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH)
    os.mkdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
             PHOTO_LIBRARY_RESSOURCES_THUMBNAILS_FOLDER_NAME)
    os.mkdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
             PHOTO_LIBRARY_RESSOURCES_BLURRED_THUMBNAIL_PLACEHOLDERS_FOLDER_NAME)
    os.mkdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
             PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME)
    os.mkdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
             PHOTO_LIBRARY_RESSOURCES_MODELS_FOLDER_NAME)
    
    # photos folder (server side renders)
    if os.path.exists(PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH) and os.path.isdir(PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH):
        shutil.rmtree(PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH)
    os.mkdir(PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH)
    # albums folder (server side renders)
    if os.path.exists(ALBUM_SERVER_SIDE_RENDER_FOLDER_PATH) and os.path.isdir(ALBUM_SERVER_SIDE_RENDER_FOLDER_PATH):
        shutil.rmtree(ALBUM_SERVER_SIDE_RENDER_FOLDER_PATH)
    os.mkdir(ALBUM_SERVER_SIDE_RENDER_FOLDER_PATH)


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

    photos_grabbed.sort(key=os.path.getmtime, reverse=True)
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
        photos_folder_mapping['all_photos']) * 5)
    for photo in photos_folder_mapping['all_photos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(MAX_THUMBNAIL_DIMENSION)
            im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                    PHOTO_LIBRARY_RESSOURCES_THUMBNAILS_FOLDER_NAME + '/' + str(photo['id']) + '.jpg', "JPEG", optimize=True)
        except IOError:
            print("Cannot create thumbnail for photo ", photo['path'])
        bar.next()

    for photo in photos_folder_mapping['all_photos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(MAX_2X_THUMBNAIL_DIMENSION)
            im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                    PHOTO_LIBRARY_RESSOURCES_THUMBNAILS_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg', "JPEG", optimize=True)
        except IOError:
            print("Cannot create @2x thumbnail for photo ", photo['path'])
        bar.next()

    for photo in photos_folder_mapping['all_photos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(MAX_BLURRED_THUMBNAIL_PLACEHOLDER_DIMENSION)
            im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                    PHOTO_LIBRARY_RESSOURCES_BLURRED_THUMBNAIL_PLACEHOLDERS_FOLDER_NAME + '/' + str(photo['id']) + '.jpg', "JPEG", quality=40)
        except IOError:
            print("Cannot create blurred thumbnail placeholder for photo ", photo['path'])
        bar.next()

    for photo in photos_folder_mapping['all_photos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(MAX_PHOTO_DIMENSION)
            im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                    PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME + '/' + str(photo['id']) + '.jpg', "JPEG", optimize=True)
        except IOError:
            print("Cannot create resized photo of ", photo['path'])
        bar.next()

    for photo in photos_folder_mapping['all_photos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(MAX_2X_PHOTO_DIMENSION)
            im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                    PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg', "JPEG", optimize=True)
        except IOError:
            print("Cannot create @2x resized photo of ", photo['path'])
        bar.next()


def build_index_file(photos_folder_mapping, credits_index):
    index_file = {'all_photos': [], 'albums': [], 'credits': credits_index}
    already_added_photo_elt = []
    for photo in photos_folder_mapping['all_photos']:
        im = Image.open(photo['path'])
        photo_width, photo_height = im.size
        photo_elt = {
            'id': photo['id'],
            'thumbnailUrl': PHOTO_LIBRARY_RESSOURCES_THUMBNAILS_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
            'thumbnail2xUrl': PHOTO_LIBRARY_RESSOURCES_THUMBNAILS_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
            'blurredThumbnailPlaceholderUrl': PHOTO_LIBRARY_RESSOURCES_BLURRED_THUMBNAIL_PLACEHOLDERS_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
            'photoUrl': PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
            'photo2xUrl': PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
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
                'thumbnailUrl': PHOTO_LIBRARY_RESSOURCES_THUMBNAILS_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
                'thumbnail2xUrl': PHOTO_LIBRARY_RESSOURCES_THUMBNAILS_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
                'blurredThumbnailPlaceholderUrl': PHOTO_LIBRARY_RESSOURCES_BLURRED_THUMBNAIL_PLACEHOLDERS_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
                'photoUrl': PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
                'photo2xUrl': PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
                'width': photo_width,
                'height': photo_height
            }
            album_photos.append(photo_elt)
        index_file['albums'].append({'name': album, 'photos': album_photos})

    with open(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH + PHOTO_LIBRARY_RESSOURCES_PHOTOS_INDEX_NAME, 'w') as outfile:
        json.dump(index_file, outfile)

# Method found on Stack Overflow - Generating an MD5 checksum of a file
# (https://stackoverflow.com/questions/3431825/generating-an-md5-checksum-of-a-file)
def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


def build_server_side_renders(photos_folder_mapping):
    # all photos
    with open(PHOTO_SERVER_SIDE_RENDER_TEMPLATE_FILE_PATH) as template:
        photo_server_side_render_template = template.read()
        for photo in photos_folder_mapping['all_photos']:
            photo_server_side_render = photo_server_side_render_template.replace(
                '{PHOTO_URL}', FLOWTOS_BASEURL + PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME + '/' + PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME + '/' + photo['id'] + '.jpg')
            photo_server_side_render = photo_server_side_render.replace(
                '{SERVER_SIDE_RENDER_URL}', FLOWTOS_BASEURL + 'photos/' + photo['id'])
            
            with open(PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH + photo['id'] + '.html', 'w+') as render:
                render.write(photo_server_side_render)

    with open(PHOTO_SERVER_SIDE_RENDER_HTACCESS_FILE_PATH) as htaccess_source:
        with open(PHOTO_SERVER_SIDE_RENDER_FOLDER_PATH + '.htaccess', 'w+') as htaccess_destination:
            htaccess_destination.write(htaccess_source.read())

    # albums
    with open(ALBUM_SERVER_SIDE_RENDER_TEMPLATE_FILE_PATH) as template:
        album_server_side_render_template = template.read()
        for album in photos_folder_mapping['albums']:
            album_server_side_render = album_server_side_render_template.replace(
                '{PHOTO_URL}', FLOWTOS_BASEURL + PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME + '/' + PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME + '/' + photos_folder_mapping['albums'][album]['photos'][0]['id'] + '.jpg')
            album_server_side_render = album_server_side_render.replace(
                '{SERVER_SIDE_RENDER_URL}', FLOWTOS_BASEURL + 'albums/' + album)
            album_server_side_render = album_server_side_render.replace(
                '{ALBUM_NAME}', album)

            with open(ALBUM_SERVER_SIDE_RENDER_FOLDER_PATH + album + '.html', 'w+') as render:
                render.write(album_server_side_render)

    with open(ALBUM_SERVER_SIDE_RENDER_HTACCESS_FILE_PATH) as htaccess_source:
        with open(ALBUM_SERVER_SIDE_RENDER_FOLDER_PATH + '.htaccess', 'w+') as htaccess_destination:
            htaccess_destination.write(htaccess_source.read())


def build_credits_ressources():
    index = {'models': []}
    models_grabbed = []

    for supported_photo_type in SUPPORTED_PHOTO_TYPES:
        pathname = MODELS_FOLDER_PATH + '**/*' + supported_photo_type
        models_grabbed.extend(
            glob.glob(pathname, recursive=True))

    if len(models_grabbed) > 0:
        bar = Bar('Processing models', max=len(models_grabbed))
        for model in models_grabbed:
            model_basename = os.path.basename(model)
            model_basename_array = model_basename.split('.')[0].split('#')
            model_fullname = model_basename_array[0]
            model_instagran = model_basename_array[1]
            model_formated_fullname = ''.join(
                x for x in model_fullname.title() if not x.isspace())

            # regular thumbnail
            try:
                im = Image.open(model)
                im = crop_max_square(im)
                im.thumbnail(MODEL_THUMBNAIL_DIMENSION)
                im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                        PHOTO_LIBRARY_RESSOURCES_MODELS_FOLDER_NAME + '/' + model_formated_fullname + '.jpg', "JPEG")
            except IOError:
                print("Cannot create thumbnail for model ", model)

            # retina (2x) thumbnail
            try:
                im = Image.open(model)
                im = crop_max_square(im)
                im.thumbnail(MODEL_2X_THUMBNAIL_DIMENSION)
                im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                        PHOTO_LIBRARY_RESSOURCES_MODELS_FOLDER_NAME + '/' + model_formated_fullname + '@2x.jpg', "JPEG")
            except IOError:
                print("Cannot create @2x thumbnail for model ", model)

            model_index_element = {
                'fullname': model_fullname,
                'formatedFullName': model_formated_fullname,
                'instagram': model_instagran,
                'thumbnailUrl': PHOTO_LIBRARY_RESSOURCES_MODELS_FOLDER_NAME + '/' + model_formated_fullname + '.jpg',
                'thumbnail2xUrl': PHOTO_LIBRARY_RESSOURCES_MODELS_FOLDER_NAME + '/' + model_formated_fullname + '@2x.jpg'
            }
            index['models'].append(model_index_element)
            bar.next()

    return index


# https://note.nkmk.me/en/python-pillow-square-circle-thumbnail/
def crop_center(pil_img, crop_width, crop_height):
    img_width, img_height = pil_img.size
    return pil_img.crop(((img_width - crop_width) // 2,
                         (img_height - crop_height) // 2,
                         (img_width + crop_width) // 2,
                         (img_height + crop_height) // 2))


# https://note.nkmk.me/en/python-pillow-square-circle-thumbnail/
def crop_max_square(pil_img):
    return crop_center(pil_img, min(pil_img.size), min(pil_img.size))


def build_photo_library_ressources():
    clean_and_init_photo_library_ressources_folders()
    package_file = load_package_file()
    flowtos_version = package_file['version']
    print("Building photo library ressources for Flowtos version: ", flowtos_version)
    photos_folder_mapping = build_photos_folder_mapping()
    build_optimized_images(photos_folder_mapping)
    credits_index = build_credits_ressources()
    build_index_file(photos_folder_mapping, credits_index)
    build_server_side_renders(photos_folder_mapping)
    print("\nDone")


if __name__ == '__main__':
    build_photo_library_ressources()
