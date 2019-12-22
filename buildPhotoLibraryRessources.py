#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Build ressources to be used by Flowtos.

Those ressources include optimized images, thumbnails and, properties files.
"""

import json

PACKAGE_FILE_PATH = './package.json'
PHOTOS_FOLDER_PATH = './photos/'
PHOTO_LIBRARY_RESSOURCES_FOLDER_PATH = './public/photo-library-ressources/'

def load_package_file():
    with open(PACKAGE_FILE_PATH) as json_file:
        return json.load(json_file)

def build_photo_library_ressources():
    package_file = load_package_file()
    flowtos_version = package_file['version']

if __name__ == '__main__':
    build_photo_library_ressources()
