#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Build credits / models section for the about page"""


import os
import glob
import shutil
from progress.bar import Bar
from PIL import Image

import bplrh_helpers.tools

def reset(config):
    models_path = config['plr']['main_folder_path'] + config['plr']['models_folder_name']
    if os.path.exists(models_path) and os.path.isdir(models_path):
        shutil.rmtree(models_path)

    os.mkdir(models_path)


def build(config):
    index = {'models': []}
    models_grabbed = []

    for supported_photo_type in config['supported_photo_types']:
        pathname = config['sources']['models_path'] + \
            '**/*' + supported_photo_type
        models_grabbed.extend(
            glob.glob(pathname, recursive=True))

    if len(models_grabbed) > 0:
        bar = Bar('Processing models', max=len(models_grabbed))
        for model in models_grabbed:
            model_basename = os.path.basename(model)
            model_basename_array = model_basename.split('.')[0].split('#')
            model_fullname = model_basename_array[0]
            model_instagran = model_basename_array[1]
            model_id = bplrh_helpers.tools.md5(model)

            # regular thumbnail
            try:
                im = Image.open(model)
                im = bplrh_helpers.tools.crop_max_square(im)
                im.thumbnail(config['plr']['max_dimensions']['model'])
                if im.mode == 'RGBA':
                    im = im.convert('RGB')
                im.save(config['plr']['main_folder_path'] +
                        config['plr']['models_folder_name'] + '/' + model_id + '.jpg', "JPEG")
            except IOError:
                print("Cannot create thumbnail for model ", model)

            # retina (2x) thumbnail
            try:
                im = Image.open(model)
                im = bplrh_helpers.tools.crop_max_square(im)
                im.thumbnail(config['plr']['max_dimensions']['model_2x'])
                if im.mode == 'RGBA':
                    im = im.convert('RGB')
                im.save(config['plr']['main_folder_path'] +
                        config['plr']['models_folder_name'] + '/' + model_id + '@2x.jpg', "JPEG")
            except IOError:
                print("Cannot create @2x thumbnail for model ", model)

            model_index_element = {
                'id': model_id,
                'fullname': model_fullname,
                'thumbnailUrl': config['plr']['models_folder_name'] + '/' + model_id + '.jpg',
                'thumbnail2xUrl': config['plr']['models_folder_name'] + '/' + model_id + '@2x.jpg'
            }
            
            if len(model_instagran) > 0:
                model_index_element['instagram'] = model_instagran

            index['models'].append(model_index_element)
            bar.next()

    return index
