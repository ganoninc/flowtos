import React from 'react'
import { useParams, useMatch, Navigate } from 'react-router-dom'
import LoadingIndicator from './LoadingIndicator'
import { Route, RouteBuilder } from './routes'

export const SSRRedirect = (): React.JSX.Element => {
    const { photoId, albumId } = useParams()

    const isAboutPage = useMatch({
        path: Route.SSR_ABOUT,
    })

    const isAlbumsPage = useMatch({
        path: Route.SSR_ALBUMS,
    })

    let navigateTo: string = Route.HOME

    if (albumId !== undefined && photoId !== undefined) {
        navigateTo = RouteBuilder.buildViewPhotoInAlbumRoute(photoId, albumId)
    } else if (albumId !== undefined) {
        navigateTo = RouteBuilder.buildViewAlbumRoute(albumId)
    } else if (isAlbumsPage !== null) {
        navigateTo = Route.ALBUMS
    } else if (photoId !== undefined) {
        navigateTo = RouteBuilder.buildViewPhotoInAllPhotosRoute(photoId)
    } else if (isAboutPage !== null) {
        navigateTo = Route.ABOUT
    }

    return (
        <>
            <LoadingIndicator></LoadingIndicator>
            <Navigate to={navigateTo} replace />
        </>
    )
}
