# Flowtos #

Flowtos is a photo gallery app made with react. I developed it after I closed my instagram account.
It aims to be simple and content focused.

## Features ##

- Displays a flow of photos made of same length rows
- Two modes: Latest Photos (all photos) and Albums
- Click on a picture to enlarge it
- About page with dynamic Models section
- Easy to organize photo library
- Assets optimization
- Static Server Side Rendering
- No need to have Node.js or PHP running on the server
- Support High-Density Retina Displays
- Support Dark Mode (prefers-color-scheme: dark)
- Generates sharable unique URLs for photos and albums
- Lazy image loading
- Responsive design

## Getting started ##

### Dependencies ###

#### 1. javascript ####

```bash
npm install
```

#### 2. python ####

```bash
pip3 install -r requirements.txt
```

### Building Photo Library Ressources ###

Put your original pictures in the ```./original_ressources/photos``` folder. Pictures in subfolders will be interpreted as part of albums by Flowtos. A typical photos folder looks like this:

```
[] original_ressources
    [] photos
        - IMG_0027.jpg
        - IMG_0028.jpg
        - IMG_0029.jpg
        [] Portraits
            - IMG_0025.jpg
            - IMG_0026.jpg
        [] Landscapes
            - IMG_0001.jpg
            - IMG_0002.jpg
            - IMG_0003.jpg
    [] credits
        [] models
            - Steve Jobs#sjobs.jpg
```

You can give credit to your models by placing their profile picture in the ```./original_ressources/credits/models``` folder. See the file  ```HOWTO.md``` in that folder for file naming convention.

Then run:

```bash
python3 buildPhotoLibraryRessources.py
```

### Running the app locally ###

```bash
npm start
```