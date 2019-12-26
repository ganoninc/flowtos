#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Build ressources to be used by Flowtos.

Those ressources include optimized images, thumbnails and, properties files.
"""

import os
import glob
import json
from PIL import Image

PACKAGE_FILE_PATH = './package.json'
PHOTOS_FOLDER_PATH = './photos/'
SUPPORTED_PHOTO_TYPES = ['.jpg']
PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH = './public/photo-library-ressources/'
PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME = 'thumbnails'
MAX_THUMBNAIL_DIMENSION = (128, 128)

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
    for photo in photos_folder_mapping['all_photos']:
        try:
            im = Image.open(photo['path'])
            im.thumbnail(MAX_THUMBNAIL_DIMENSION)
            im.save(PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH +
                    PHOTO_LIBRARY_RESSOURCES_THUMBNAIL_FOLDER_NAME + '/' + str(photo['id']) + '.jpg', "JPEG")
            print(im)
        except IOError:
            print("Cannot create thumbnail for photo ", photo['path'])

def build_photo_library_ressources():
    package_file = load_package_file()
    flowtos_version = package_file['version']
    print("Building photo library ressources for Flowtos version: ", flowtos_version)
    photos_folder_mapping = build_photos_folder_mapping()
    build_optimized_images(photos_folder_mapping)

if __name__ == '__main__':
    build_photo_library_ressources()
