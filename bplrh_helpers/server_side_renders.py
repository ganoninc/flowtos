#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Build static server side renders to be crawled by search engines. """

import os
import shutil


def reset(config):
    if os.path.exists(config['ssr']['photos']['destination_path']) and os.path.isdir(config['ssr']['photos']['destination_path']):
        shutil.rmtree(config['ssr']['photos']['destination_path'])
    if os.path.exists(config['ssr']['albums']['destination_path']) and os.path.isdir(config['ssr']['albums']['destination_path']):
        shutil.rmtree(config['ssr']['albums']['destination_path'])

    os.mkdir(config['ssr']['photos']['destination_path'])
    os.mkdir(config['ssr']['albums']['destination_path'])


def _build_photos(photos_folder_mapping, flowtos_baseurl, plr_folder_name, plr_photos_folder_name, photo_template_path, htaccess_template_path, dest_path):
    with open(photo_template_path) as photo_template_file:
        photo_template = photo_template_file.read()

        for photo in photos_folder_mapping['all_photos']:
            photo_render = photo_template.replace(
                '{PHOTO_URL}', flowtos_baseurl + plr_folder_name + '/' + plr_photos_folder_name + '/' + photo['id'] + '.jpg')
            photo_render = photo_render.replace(
                '{SERVER_SIDE_RENDER_URL}', flowtos_baseurl + 'photos/' + photo['id'])
            photo_render = photo_render.replace(
                '{PHOTO_ID}', photo['id'])

            with open(dest_path + photo['id'] + '.html', 'w+') as render:
                render.write(photo_render)

    with open(htaccess_template_path) as htaccess_source:
        with open(dest_path + '.htaccess', 'w+') as htaccess_destination:
            htaccess_destination.write(htaccess_source.read())


def _build_albums_photos(photos_folder_mapping, flowtos_baseurl, plr_folder_name, plr_photos_folder_name, photo_in_album_template_path, album_id, dest_path):
    with open(photo_in_album_template_path) as photo_in_album_template_file:
        photo_in_album_template = photo_in_album_template_file.read()

        for photo in photos_folder_mapping['albums'][album_id]['photos']:
            photo_in_album_render = photo_in_album_template.replace(
                '{PHOTO_URL}', flowtos_baseurl + plr_folder_name + '/' + plr_photos_folder_name + '/' + photo['id'] + '.jpg')
            photo_in_album_render = photo_in_album_render.replace(
                '{ALBUM_NAME}', album_id)
            photo_in_album_render = photo_in_album_render.replace(
                '{ALBUM_ID}', album_id)
            photo_in_album_render = photo_in_album_render.replace(
                '{SERVER_SIDE_RENDER_URL}', flowtos_baseurl + 'albums/' + album_id + '/' + photo['id'])
            photo_in_album_render = photo_in_album_render.replace(
                '{PHOTO_ID}', photo['id'])

            with open(dest_path + '/' + photo['id'] + '.html', 'w+') as render:
                render.write(photo_in_album_render)


def _build_albums(photos_folder_mapping, flowtos_baseurl, plr_folder_name, plr_photos_folder_name, album_template_path, photo_in_album_template_path, htaccess_template_path, dest_path):
    with open(album_template_path) as album_template_file:
        album_template = album_template_file.read()

        for album in photos_folder_mapping['albums']:
            album_dest_path = dest_path + album
            os.mkdir(album_dest_path)

            album_render = album_template.replace(
                '{PHOTO_URL}', flowtos_baseurl + plr_folder_name + '/' + plr_photos_folder_name + '/' + photos_folder_mapping['albums'][album]['photos'][0]['id'] + '.jpg')
            album_render = album_render.replace(
                '{SERVER_SIDE_RENDER_URL}', flowtos_baseurl + 'albums/' + album)
            album_render = album_render.replace(
                '{ALBUM_NAME}', album)
            album_render = album_render.replace(
                '{ALBUM_ID}', album)

            with open(album_dest_path + '/index.html', 'w+') as render:
                render.write(album_render)

            _build_albums_photos(photos_folder_mapping, flowtos_baseurl, plr_folder_name,
                                 plr_photos_folder_name, photo_in_album_template_path, album, album_dest_path)


    with open(htaccess_template_path) as htaccess_source:
        with open(dest_path + '.htaccess', 'w+') as htaccess_destination:
            htaccess_destination.write(htaccess_source.read())


def build(photos_folder_mapping, config):
    # _build_photos(photos_folder_mapping, config)

    # _build_albums(photos_folder_mapping, config)
    
