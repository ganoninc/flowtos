#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Build static server side renders to be crawled by search engines. """

import os
import shutil


def reset(ssr_photos_folder_path, ssr_albums_path):
    if os.path.exists(ssr_photos_folder_path) and os.path.isdir(ssr_photos_folder_path):
        shutil.rmtree(ssr_photos_folder_path)
    if os.path.exists(ssr_albums_path) and os.path.isdir(ssr_albums_path):
        shutil.rmtree(ssr_albums_path)

    os.mkdir(ssr_photos_folder_path)
    os.mkdir(ssr_albums_path)


def _build_photos(photos_folder_mapping, flowtos_baseurl, plr_folder_name, plr_photos_folder_name, photo_template_path, htaccess_template_path, dest_path):
    # photos renders
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


def build(photos_folder_mapping, flowtos_baseurl, plr_folder_name, plr_photos_folder_name, ssr_photo_template_path, ssr_photo_htaccess_template_path, ssr_photos_dest_path):
    _build_photos(photos_folder_mapping, flowtos_baseurl,
                  plr_folder_name, plr_photos_folder_name, ssr_photo_template_path, ssr_photo_htaccess_template_path, ssr_photos_dest_path)

    # albums
    # with open(ALBUM_SERVER_SIDE_RENDER_TEMPLATE_FILE_PATH) as album_template:
    #     with open(PHOTO_IN_ALBUM_SERVER_SIDE_RENDER_TEMPLATE_FILE_PATH) as photo_in_album_template:
    #         album_server_side_render_template = album_template.read()
    #         photo_in_album_server_side_render_template = photo_in_album_template.read()

    #         for album in photos_folder_mapping['albums']:
    #             album_ssr_folder_path = ALBUM_SERVER_SIDE_RENDER_FOLDER_PATH + album
    #             os.mkdir(album_ssr_folder_path)

    #             album_server_side_render = album_server_side_render_template.replace(
    #                 '{PHOTO_URL}', FLOWTOS_BASEURL + PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME + '/' + PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME + '/' + photos_folder_mapping['albums'][album]['photos'][0]['id'] + '.jpg')
    #             album_server_side_render = album_server_side_render.replace(
    #                 '{SERVER_SIDE_RENDER_URL}', FLOWTOS_BASEURL + 'albums/' + album)
    #             album_server_side_render = album_server_side_render.replace(
    #                 '{ALBUM_NAME}', album)
    #             album_server_side_render = album_server_side_render.replace(
    #                 '{ALBUM_ID}', album)

    #             with open(album_ssr_folder_path + '/index.html', 'w+') as render:
    #                 render.write(album_server_side_render)

    #             # albums' photos
    #             for photo in photos_folder_mapping['albums'][album]['photos']:
    #                 photo_in_album_server_side_render = photo_in_album_server_side_render_template.replace(
    #                     '{PHOTO_URL}', FLOWTOS_BASEURL + PHOTO_LIBRARY_RESSOURCES_FOLDER_NAME + '/' + PHOTO_LIBRARY_RESSOURCES_PHOTOS_FOLDER_NAME + '/' + photo['id'] + '.jpg')
    #                 photo_in_album_server_side_render = photo_in_album_server_side_render.replace(
    #                     '{ALBUM_NAME}', album)
    #                 photo_in_album_server_side_render = photo_in_album_server_side_render.replace(
    #                     '{ALBUM_ID}', album)
    #                 photo_in_album_server_side_render = photo_in_album_server_side_render.replace(
    #                     '{SERVER_SIDE_RENDER_URL}', FLOWTOS_BASEURL + 'albums/' + album + '/' + photo['id'])
    #                 photo_in_album_server_side_render = photo_in_album_server_side_render.replace(
    #                     '{PHOTO_ID}', photo['id'])

    #                 with open(album_ssr_folder_path + '/' + photo['id'] + '.html', 'w+') as render:
    #                     render.write(photo_in_album_server_side_render)


    # with open(ALBUM_SERVER_SIDE_RENDER_HTACCESS_FILE_PATH) as htaccess_source:
    #     with open(ALBUM_SERVER_SIDE_RENDER_FOLDER_PATH + '.htaccess', 'w+') as htaccess_destination:
    #         htaccess_destination.write(htaccess_source.read())
