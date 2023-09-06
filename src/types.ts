export type Photo = {
    id: string
    thumbnailUrl: string
    thumbnail2xUrl: string
    blurredThumbnailPlaceholderUrl: string
    photoUrl: string
    photo2xUrl: string
    width: number
    height: number
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
