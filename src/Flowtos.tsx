import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RoutesConfig } from './RoutesConfig'
import { ErrorMessage } from './ErrorMessage'
import LoadingIndicator from './LoadingIndicator'
import { Menu, MenuItemKey } from './Menu'
import type { Exception } from 'sass'
import type { PhotoLibraryIndex } from './types'
import { Photos } from './photos/Photos'
import { Albums } from './albums/Albums'
import { Album } from './albums/Album'
import { About } from './about/About'
import { SSRRedirect } from './SSRRedirect'

import './Flowtos.scss'
import { Container } from 'react-bootstrap'

const enum LoadingStatus {
    LOADING,
    LOADED,
    ERROR,
}

type LoadingState =
    | {
          status: LoadingStatus.LOADING
      }
    | {
          status: LoadingStatus.LOADED
          photoLibraryIndex: PhotoLibraryIndex
      }
    | {
          status: LoadingStatus.ERROR
          errorMessage: string
      }

type FlowtosProps = {
    photoLibraryEndpoint: string
}

export const Flowtos = (props: FlowtosProps): React.JSX.Element => {
    const { photoLibraryEndpoint } = props

    const [LoadingState, setLoadingState] = useState<LoadingState>({
        status: LoadingStatus.LOADING,
    })

    useEffect(() => {
        const fetchPhotoLibraryIndex = async (): Promise<void> => {
            const res = await fetch(photoLibraryEndpoint + 'index.json')
            res.json()
                .then((photoLibraryIndex) => {
                    setLoadingState({
                        status: LoadingStatus.LOADED,
                        photoLibraryIndex: {
                            allPhotos: photoLibraryIndex.allPhotos,
                            sharedPhotosData: photoLibraryIndex.sharedPhotosData,
                            albums: photoLibraryIndex.albums,
                            models: photoLibraryIndex.credits.models,
                        },
                    })
                })
                .catch((error: Exception) => {
                    setLoadingState({
                        status: LoadingStatus.ERROR,
                        errorMessage: error.toString(),
                    })
                })
        }

        void fetchPhotoLibraryIndex()
    }, [photoLibraryEndpoint])

    const MainContent = (): React.JSX.Element => {
        switch (LoadingState.status) {
            case LoadingStatus.ERROR:
                return <ErrorMessage />
            case LoadingStatus.LOADED:
                if (LoadingState.photoLibraryIndex.allPhotos.length > 0) {
                    const MenuFactory = (menuItemKey: MenuItemKey) => (
                        <Menu
                            displayAlbums={LoadingState.photoLibraryIndex.albums.length > 0}
                            activeItemKey={menuItemKey}
                        />
                    )

                    const PhotosImpl = (
                        <Photos
                            photoList={LoadingState.photoLibraryIndex.allPhotos}
                            sharedPhotosData={LoadingState.photoLibraryIndex.sharedPhotosData}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    )

                    const AlbumImpl = (
                        <Album
                            albumList={LoadingState.photoLibraryIndex.albums}
                            sharedPhotosData={LoadingState.photoLibraryIndex.sharedPhotosData}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    )

                    const AlbumsImpl = (
                        <Albums
                            albumList={LoadingState.photoLibraryIndex.albums}
                            sharedPhotosData={LoadingState.photoLibraryIndex.sharedPhotosData}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    )

                    const AboutImpl = (
                        <About
                            models={LoadingState.photoLibraryIndex.models}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    )

                    const SSRRedirectImpl = <SSRRedirect />

                    return (
                        <RoutesConfig
                            MenuFactory={MenuFactory}
                            Photos={PhotosImpl}
                            Albums={AlbumsImpl}
                            Album={AlbumImpl}
                            About={AboutImpl}
                            SSRRedirect={SSRRedirectImpl}
                        />
                    )
                } else {
                    return <ErrorMessage />
                }
            default:
                return <LoadingIndicator />
        }
    }

    return (
        <div className='flowtos'>
            <Router basename='/flowtos'>
                <Container>
                    <header className='Flowtos-header pt-5'>
                        <span className='text-muted'>Romain J. Giovanetti</span>
                        <h1 className='mt-2'>Jeu de Lumières</h1>
                    </header>
                    <main>
                        <MainContent />
                    </main>
                    <footer className='pb-5 footer'>
                        <Container>
                            <span className='small text-muted'>
                                All images © 2002-2023{' '}
                                <a href='https://www.giovanetti.fr/'>Romain J. Giovanetti</a>
                                <br />
                                Flowtos by{' '}
                                <a href='https://www.giovanetti.fr/'>Romain J. Giovanetti</a>,{' '}
                                <a
                                    rel='noopener noreferrer'
                                    target='_blank'
                                    href='https://github.com/ganoninc/flowtos'
                                >
                                    fork it on GitHub.
                                </a>
                            </span>
                        </Container>
                    </footer>
                </Container>
            </Router>
        </div>
    )
}
