# Flowtos #

Flowtos is a photo gallery app made with react. I developed it after I closed my instagram account.
It aims to be simple and content focused.

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

Put your original pictures in the ```photos``` folder. Pictures in subfolders will be interpreted as part of albums by Flowtos. A typical photos folder looks like this:

```
photos
    IMG_0027.jpg
    IMG_0028.jpg
    IMG_0029.jpg
    Portraits
        IMG_0025.jpg
        IMG_0026.jpg
    Landscapes
        IMG_0001.jpg
        IMG_0002.jpg
        IMG_0003.jpg
```

Then run:

```bash
python3 buildPhotoLibraryRessources.py
```

### Running the app locally ###

```bash
npm start
```