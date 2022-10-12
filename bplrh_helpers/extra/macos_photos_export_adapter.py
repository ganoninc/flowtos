# When macOS Photos.app exports an album, it follows the order of the pictures.
# The first pictures of the album are also the first to be exported.
# Thus they are the first and oldest files written on the disk.
# The problem is Flowtos sorts pictures by the value of the last_modified attribute. 
# So eventually the first pictures become the last ones.
# This script is here to "reverse" the last_modified attribute of the exported pictures to fix that issue.

import sys
import os
import glob
from pathlib import Path
import time

def update_folder(working_directory):
    if os.path.isdir(working_directory):
        files = glob.glob(working_directory + '/*.jpeg', recursive=False)
        files.extend(glob.glob(working_directory + '/*.JPEG', recursive=False))
        files.extend(glob.glob(working_directory + '/*.jpg', recursive=False))
        files.extend(glob.glob(working_directory + '/*.JPG', recursive=False))
        files.sort(key=os.path.getmtime, reverse=True)
        for file in files:
            Path(file).touch()
            print(file + " touched!")
            time.sleep(0.25)
    else:
        raise Exception("Invalid working directory")

if __name__ == '__main__':
    if len(sys.argv) == 1:
        raise Exception("Missing argument. Please provide a working directory using the -wd option followed by the path of the targeted folder")
    elif len(sys.argv) == 2 and sys.argv[1] == '-wd':
        raise Exception("Missing argument. You forgot to specify the path of the targeted folder after the -wd option")
    elif len(sys.argv) == 3 and sys.argv[1] == '-wd':
        update_folder(sys.argv[2])
