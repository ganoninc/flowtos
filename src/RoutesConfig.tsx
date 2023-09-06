import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { GATracker } from './GATracker'
import { Photos } from './photos/Photos'
import { Albums } from './albums/Albums'
import { Album } from './albums/Album'
import { About } from './about/About'
import { SSRRedirect } from './SSRRedirect'
import type { PhotoLibraryIndex } from './types'
import { Route as RoutePath } from './routes'

type RoutesConfigProps = {
    photoLibraryIndex: PhotoLibraryIndex
    photoLibraryEndpoint: string
}

export const RoutesConfig = (props: RoutesConfigProps): React.JSX.Element => {
    const { photoLibraryIndex, photoLibraryEndpoint } = props
    return (
        <Routes>
            <Route
                path={RoutePath.VIEW_PHOTO_IN_ALL_PHOTOS}
                element={
                    <GATracker>
                        <Photos
                            photoList={photoLibraryIndex.allPhotos}
                            sharedPhotosData={photoLibraryIndex.sharedPhotosData}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.VIEW_ALBUM}
                element={
                    <GATracker>
                        <Album
                            albumList={photoLibraryIndex.albums}
                            sharedPhotosData={photoLibraryIndex.sharedPhotosData}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.VIEW_PHOTO_IN_ALBUM}
                element={
                    <GATracker>
                        <Album
                            albumList={photoLibraryIndex.albums}
                            sharedPhotosData={photoLibraryIndex.sharedPhotosData}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.ALBUMS}
                element={
                    <GATracker>
                        <Albums
                            albumList={photoLibraryIndex.albums}
                            sharedPhotosData={photoLibraryIndex.sharedPhotosData}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.ABOUT}
                element={
                    <GATracker>
                        <About
                            models={photoLibraryIndex.models}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.SSR_VIEW_PHOTO_IN_ALL_PHOTOS}
                element={
                    <GATracker>
                        <SSRRedirect />
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.SSR_VIEW_ALBUM}
                element={
                    <GATracker>
                        <SSRRedirect />
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.SSR_VIEW_PHOTO_IN_ALBUM}
                element={
                    <GATracker>
                        <SSRRedirect />
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.SSR_ALBUMS}
                element={
                    <GATracker>
                        <SSRRedirect />
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.SSR_ABOUT}
                element={
                    <GATracker>
                        <SSRRedirect />
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.SSR_HOME}
                element={
                    <GATracker>
                        <SSRRedirect />
                    </GATracker>
                }
            />
            <Route
                path={RoutePath.HOME}
                element={
                    <GATracker>
                        <Photos
                            photoList={photoLibraryIndex.allPhotos}
                            sharedPhotosData={photoLibraryIndex.sharedPhotosData}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    </GATracker>
                }
            />
        </Routes>
    )
}
