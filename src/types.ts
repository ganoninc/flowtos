export type Photo = {
    id: string
    photo: {
        url: string
        width: number
        height: number
    }
    photo2x: {
        url: string
        width: number
        height: number
    }
    thumbnail: {
        url: string
        width: number
        height: number
    }
    thumbnail2x: {
        url: string
        width: number
        height: number
    }
    blurredThumbnailPlaceholderUrl: string
}

export type PhotoReference = {
    sharedPhotosDataIndex: number
}

export type Album = {
    name: string
    encodedName: string
    photos: PhotoReference[]
}

export type Model = {
    id: string
    fullname: string
    instagram: string | undefined
    thumbnailUrl: string
    thumbnail2xUrl: string
}

export type PhotoLibraryIndex = {
    allPhotos: PhotoReference[]
    sharedPhotosData: Photo[]
    albums: Album[]
    models: Model[]
}
