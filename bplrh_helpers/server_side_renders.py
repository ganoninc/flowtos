#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Build static server side renders to be crawled by search engines"""

import os
import shutil

import bplrh_helpers.tools


def reset(config):
    if os.path.exists(config['ssr']['photos']['destination_path']) and os.path.isdir(config['ssr']['photos']['destination_path']):
        shutil.rmtree(config['ssr']['photos']['destination_path'])
    if os.path.exists(config['ssr']['albums']['destination_path']) and os.path.isdir(config['ssr']['albums']['destination_path']):
        shutil.rmtree(config['ssr']['albums']['destination_path'])
    if os.path.exists(config['ssr']['about']['destination_path']) and os.path.isdir(config['ssr']['about']['destination_path']):
        shutil.rmtree(config['ssr']['about']['destination_path'])

    os.mkdir(config['ssr']['photos']['destination_path'])
    os.mkdir(config['ssr']['albums']['destination_path'])
    os.mkdir(config['ssr']['about']['destination_path'])


def _build_photos(photos, config):
    with open(config['ssr']['photos']['render_template_path']) as photo_template_file:
        photo_template = photo_template_file.read()

        for photo in photos:
            photo_render = photo_template.replace(
                '{PHOTO_URL}', config['flowtos_baseurl'] + config['plr']['main_folder_name'] + '/' + config['plr']['photos_folder_name'] + '/' + photo['id'] + '.webp')
            photo_render = photo_render.replace(
                '{SERVER_SIDE_RENDER_URL}', config['flowtos_baseurl'] + 'photos/' + photo['id'])
            photo_render = photo_render.replace(
                '{PHOTO_ID}', photo['id'])

            with open(config['ssr']['photos']['destination_path'] + photo['id'] + '.html', 'w+') as render:
                render.write(photo_render)

    with open(config['ssr']['photos']['htaccess_template_path']) as htaccess_source:
        with open(config['ssr']['photos']['destination_path'] + '.htaccess', 'w+') as htaccess_destination:
            htaccess_destination.write(htaccess_source.read())

    with open(config['ssr']['photos']['index_template_path']) as photos_index_template_file:
        photos_index_template = photos_index_template_file.read()

        photos_index = photos_index_template.replace(
            '{SERVER_SIDE_RENDER_URL}', config['flowtos_baseurl'])

        with open(config['ssr']['photos']['destination_path'] + 'index.html', 'w+') as index:
            index.write(photos_index)


def _build_photos_in_album(photos, config, album_name, album_encoded_name, dest_path):
    with open(config['ssr']['photos_in_albums']['render_template_path']) as photo_in_album_template_file:
        photo_in_album_template = photo_in_album_template_file.read()

        for photo in photos:
            photo_in_album_render = photo_in_album_template.replace(
                '{PHOTO_URL}', config['flowtos_baseurl'] + config['plr']['main_folder_name'] + '/' + config['plr']['photos_folder_name'] + '/' + photo['id'] + '.webp')
            photo_in_album_render = photo_in_album_render.replace(
                '{ALBUM_NAME}', album_name)
            photo_in_album_render = photo_in_album_render.replace(
                '{ALBUM_ID}', album_encoded_name)
            photo_in_album_render = photo_in_album_render.replace(
                '{SERVER_SIDE_RENDER_URL}', config['flowtos_baseurl'] + 'albums/' + album_encoded_name + '/' + photo['id'])
            photo_in_album_render = photo_in_album_render.replace(
                '{PHOTO_ID}', photo['id'])

            with open(dest_path + '/' + photo['id'] + '.html', 'w+') as render:
                render.write(photo_in_album_render)


def _build_albums(albums, config):
    with open(config['ssr']['albums']['render_template_path']) as album_template_file:
        album_template = album_template_file.read()

        for album in albums:
            album_encoded_name = bplrh_helpers.tools.encode_album_name(album)
            album_dest_path = config['ssr']['albums']['destination_path'] + album_encoded_name
            os.mkdir(album_dest_path)

            album_render = album_template.replace(
                '{PHOTO_URL}', config['flowtos_baseurl'] + config['plr']['main_folder_name'] + '/' + config['plr']['photos_folder_name'] + '/' + albums[album]['photos'][0]['id'] + '.webp')
            album_render = album_render.replace(
                '{SERVER_SIDE_RENDER_URL}', config['flowtos_baseurl'] + 'albums/' + album_encoded_name)
            album_render = album_render.replace(
                '{ALBUM_NAME}', album)
            album_render = album_render.replace(
                '{ALBUM_ID}', album_encoded_name)

            with open(album_dest_path + '/index.html', 'w+') as render:
                render.write(album_render)

            _build_photos_in_album(
                albums[album]['photos'], config, album, album_encoded_name, album_dest_path)

    with open(config['ssr']['albums']['htaccess_template_path']) as htaccess_source:
        with open(config['ssr']['albums']['destination_path'] + '.htaccess', 'w+') as htaccess_destination:
            htaccess_destination.write(htaccess_source.read())

    with open(config['ssr']['albums']['index_template_path']) as albums_index_template_file:
        albums_index_template = albums_index_template_file.read()

        albums_index = albums_index_template.replace(
            '{SERVER_SIDE_RENDER_URL}', config['flowtos_baseurl'] + 'albums')

        with open(config['ssr']['albums']['destination_path'] + 'index.html', 'w+') as index:
            index.write(albums_index)


def _build_about(config):
    with open(config['ssr']['about']['render_template_path']) as about_template_file:
        about_template = about_template_file.read()

        about_template_render = about_template.replace(
            '{SERVER_SIDE_RENDER_URL}', config['flowtos_baseurl'] + 'about')

        with open(config['ssr']['about']['destination_path'] + '/index.html', 'w+') as render:
            render.write(about_template_render)


def build(photos_folder_mapping, config):
    _build_photos(photos_folder_mapping['allPhotos'], config)
    _build_albums(photos_folder_mapping['albums'], config)
    _build_about(config)
