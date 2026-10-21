import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router'
import RoutesConfig from './RoutesConfig'
import { ErrorMessage } from './ErrorMessage'
import LoadingIndicator from './LoadingIndicator'
import Menu, { MenuItemKey } from './Menu'
import type { PhotoLibraryIndex } from './types'
import SSRRedirect from './SSRRedirect'

import './Flowtos.scss'
import { Container } from 'react-bootstrap'

const Photos = lazy(() => import('./photos/Photos'))
const Albums = lazy(() => import('./albums/Albums'))
const Album = lazy(() => import('./albums/Album'))
const About = lazy(() => import('./about/About'))

const routerBasename = '/flowtos'

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

const Flowtos = ({ photoLibraryEndpoint }: FlowtosProps) => {
    const [loadingState, setLoadingState] = useState<LoadingState>({
        status: LoadingStatus.LOADING,
    })

    useEffect(() => {
        fetch(photoLibraryEndpoint + 'index.json')
            .then((response) => response.json())
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
            .catch((error) => {
                setLoadingState({
                    status: LoadingStatus.ERROR,
                    errorMessage: error.toString(),
                })
            })
    }, [photoLibraryEndpoint])

    // The router renders nothing outside its basename (e.g. "/" on the dev server)
    if (!window.location.pathname.startsWith(routerBasename)) {
        window.location.replace(routerBasename + '/')
        return null
    }

    const currentYear = new Date().getFullYear()

    const MainContent = () => {
        switch (loadingState.status) {
            case LoadingStatus.ERROR:
                return <ErrorMessage />
            case LoadingStatus.LOADED:
                if (loadingState.photoLibraryIndex.allPhotos.length > 0) {
                    const MenuFactory = (menuItemKey: MenuItemKey) => (
                        <Menu
                            displayAlbums={loadingState.photoLibraryIndex.albums.length > 0}
                            activeItemKey={menuItemKey}
                        />
                    )

                    const PhotosImpl = (
                        <Photos
                            photoList={loadingState.photoLibraryIndex.allPhotos}
                            sharedPhotosData={loadingState.photoLibraryIndex.sharedPhotosData}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    )

                    const AlbumImpl = (
                        <Album
                            albumList={loadingState.photoLibraryIndex.albums}
                            sharedPhotosData={loadingState.photoLibraryIndex.sharedPhotosData}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    )

                    const AlbumsImpl = (
                        <Albums
                            albumList={loadingState.photoLibraryIndex.albums}
                            sharedPhotosData={loadingState.photoLibraryIndex.sharedPhotosData}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    )

                    const AboutImpl = (
                        <About
                            models={loadingState.photoLibraryIndex.models}
                            photoLibraryEndpoint={photoLibraryEndpoint}
                        />
                    )

                    const SSRRedirectImpl = <SSRRedirect />

                    return (
                        <Suspense fallback={<LoadingIndicator />}>
                            <RoutesConfig
                                MenuFactory={MenuFactory}
                                Photos={PhotosImpl}
                                Albums={AlbumsImpl}
                                Album={AlbumImpl}
                                About={AboutImpl}
                                SSRRedirect={SSRRedirectImpl}
                            />
                        </Suspense>
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
            <Router basename={routerBasename}>
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
                                All images © 2002-{`${currentYear} `}
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

export default Flowtos
