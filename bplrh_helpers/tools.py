#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Shared tools"""


import hashlib


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
