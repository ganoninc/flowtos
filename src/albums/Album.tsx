import React from 'react'
import { useParams } from 'react-router-dom'
import { Photos } from '../photos/Photos'
import type { Album as AlbumType, Photo } from '../types'
import BackSignImg from './back-sign.svg'
import { useNavigate } from 'react-router-dom'
import { Route } from '../routes'

import './Album.scss'

type AlbumProps = {
    albumList: AlbumType[]
    sharedPhotosData: Photo[]
    photoLibraryEndpoint: string
}

export const Album = (props: AlbumProps): React.JSX.Element => {
    const { albumList, sharedPhotosData, photoLibraryEndpoint } = props
    const { albumId } = useParams()
    const navigate = useNavigate()

    if (albumId === undefined) throw new Error('Missing albumId')

    const albumData = albumList.find((album) => album.encodedName === encodeURI(albumId))

    if (albumData === undefined) throw new Error('Missing albumData')

    const photoList = albumData.photos

    const navigateToAlbums = () => navigate(Route.ALBUMS)

    return (
        <div>
            <div className='album-header pt-1 pb-4'>
                <a href='#' onClick={navigateToAlbums}>
                    <div className='action-btn-left'>
                        <img className='back-sign' src={BackSignImg} alt='Back sign' height={33} />
                        <span className='label'>Back</span>
                    </div>
                </a>
                <div className='album-title'>
                    <h3>{albumData.name}</h3>
                </div>
            </div>
            <Photos
                photoList={photoList}
                sharedPhotosData={sharedPhotosData}
                photoLibraryEndpoint={photoLibraryEndpoint}
            />
        </div>
    )
}
