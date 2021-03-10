#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Shared tools"""


import hashlib
import urllib.parse
import unicodedata


# Method found on Stack Overflow - Generating an MD5 checksum of a file
# (https://stackoverflow.com/questions/3431825/generating-an-md5-checksum-of-a-file)
def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


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


#https://stackoverflow.com/questions/44431730/how-to-replace-accented-characters-in-python
def strip_accents(text):
    try:
        text = unicode(text, 'utf-8')
    except NameError: # unicode is a default on python 3 
        pass

    text = unicodedata.normalize('NFD', text)\
           .encode('ascii', 'ignore')\
           .decode("utf-8")

    return str(text)


def encode_album_name(album_name):
    encoded_album_name = album_name.replace('.', '-').replace(' ', '-').replace(',', '-')
    encoded_album_name = strip_accents(encoded_album_name)
    encoded_album_name = encoded_album_name.encode().decode('ascii', 'replace').replace(u'\ufffd', '-')
    return urllib.parse.quote(encoded_album_name)