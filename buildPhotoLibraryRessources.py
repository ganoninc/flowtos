#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Build ressources to be used by Flowtos.

Those ressources include optimized images, thumbnails and, properties files.
"""

import os
import glob
import json
import shutil

from PIL import Image
from progress.bar import Bar


PACKAGE_FILE_PATH = './package.json'
PHOTOS_FOLDER_PATH = './photos/'
SUPPORTED_PHOTO_TYPES = ['.jpg']
PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME = 'photo-library-ressources'
PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH = './public/' + \
    PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME + '/'
PHOTO_LIBRARY_RESSOURCES_BASE_URL = './' + PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME + '/'
PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME = 'thumbnails'
PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME = 'photos'
PHOTO_LIBRARY_RESSOURCES_PHOTO_INDEX_NAME = 'index.json'
MAX_THUMBNAIL_DIMENSION = (512, 512)
MAX_2X_THUMBNAIL_DIMENSION = (1024, 1024)
MAX_PHOTO_DIMENSION = (1280, 1280)
MAX_2X_PHOTO_DIMENSION = (2560, 2560)


def clean_and_init_photo_library_ressources_folder():
    shutil.rmtree(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH)
    os.mkdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH)
    os.mkdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
             PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME)
    os.mkdir(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
             PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME)


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
        photo_id += 1

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
    for photo in photos_folder_mapping['all_photos']:
        im = Image.open(photo['path'])
        photo_width, photo_height = im.size
        photo_elt = {
            'id': photo['id'],
            'thumbnailUrl': PHOTO_LIBRARY_RESSOURCES_BASE_URL + PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
            'thumbnail@2xUrl': PHOTO_LIBRARY_RESSOURCES_BASE_URL + PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
            'photoUrl': PHOTO_LIBRARY_RESSOURCES_BASE_URL + PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
            'photo@2xUrl': PHOTO_LIBRARY_RESSOURCES_BASE_URL + PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
            'width': photo_width,
            'height': photo_height
        }

        index_file['all_photos'].append(photo_elt)

    for album in photos_folder_mapping['albums']:
        album_photos = []
        for photo in photos_folder_mapping['albums'][album]['photos']:
            photo_elt = {
                'id': photo['id'],
                'thumbnailUrl': PHOTO_LIBRARY_RESSOURCES_BASE_URL + PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
                'thumbnail@2xUrl': PHOTO_LIBRARY_RESSOURCES_BASE_URL + PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
                'photoUrl': PHOTO_LIBRARY_RESSOURCES_BASE_URL + PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME + '/' + str(photo['id']) + '.jpg',
                'photo@2xUrl': PHOTO_LIBRARY_RESSOURCES_BASE_URL + PHOTO_LIBRARY_RESSOURCES_PHOTO_FOLDER_NAME + '/' + str(photo['id']) + '@2x.jpg',
                'width': photo_width,
                'height': photo_height
            }
            album_photos.append(photo_elt)
        index_file['albums'].append({'name:': album, 'photos': album_photos})

    with open(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH + PHOTO_LIBRARY_RESSOURCES_PHOTO_INDEX_NAME, 'w') as outfile:
        json.dump(index_file, outfile)


def build_photo_library_ressources():
    clean_and_init_photo_library_ressources_folder()
    package_file = load_package_file()
    flowtos_version = package_file['version']
    print("Building photo library ressources for Flowtos version: ", flowtos_version)
    photos_folder_mapping = build_photos_folder_mapping()
    build_optimized_images(photos_folder_mapping)
    build_index_file(photos_folder_mapping)
    print("\nDone")


if __name__ == '__main__':
    build_photo_library_ressources()
