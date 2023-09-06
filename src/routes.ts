export enum Route {
    HOME = '/',
    VIEW_PHOTO_IN_ALL_PHOTOS = '/photos/:photoId',
    ALBUMS = '/albums',
    VIEW_ALBUM = '/albums/:albumId',
    VIEW_PHOTO_IN_ALBUM = '/albums/:albumId/:photoId',
    ABOUT = '/about',
    SSR_HOME = '/ssr',
    SSR_VIEW_PHOTO_IN_ALL_PHOTOS = '/ssr/photos/:photoId',
    SSR_ALBUMS = '/ssr/albums',
    SSR_VIEW_ALBUM = '/ssr/albums/:albumId',
    SSR_VIEW_PHOTO_IN_ALBUM = '/ssr/albums/:albumId/:photoId',
    SSR_ABOUT = '/ssr/about',
}

export const RouteBuilder = {
    buildViewPhotoInAllPhotosRoute: (photoId: string): string => {
        return Route.VIEW_PHOTO_IN_ALL_PHOTOS.replace(':photoId', photoId)
    },
    buildViewAlbumRoute: (albumId: string): string => {
        return Route.VIEW_ALBUM.replace(':albumId', albumId)
    },
    buildViewPhotoInAlbumRoute: (photoId: string, albumId: string): string => {
        return Route.VIEW_PHOTO_IN_ALBUM.replace(':photoId', photoId).replace(':albumId', albumId)
    },
}
