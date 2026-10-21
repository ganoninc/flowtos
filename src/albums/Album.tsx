import { NavLink, useParams } from 'react-router'
import Photos from '../photos/Photos'
import type { Album as AlbumType, Photo } from '../types'
import BackSignImg from './back-sign.svg'
import { Route } from '../routes'

import './Album.scss'

type AlbumProps = {
    albumList: AlbumType[]
    sharedPhotosData: Photo[]
    photoLibraryEndpoint: string
}

const Album = (props: AlbumProps) => {
    const { albumList, sharedPhotosData, photoLibraryEndpoint } = props
    const { albumId } = useParams()

    if (albumId === undefined) throw new Error('Missing albumId')

    const albumData = albumList.find((album) => album.encodedName === encodeURI(albumId))

    if (albumData === undefined) throw new Error('Missing albumData')

    return (
        <div>
            <div className='album-header pt-1 pb-4'>
                <NavLink to={Route.ALBUMS}>
                    <div className='action-btn-left'>
                        <img className='back-sign' src={BackSignImg} alt='Back sign' height={33} />
                        <span className='label'>Back</span>
                    </div>
                </NavLink>
                <div className='album-title'>
                    <h3>{albumData.name}</h3>
                </div>
            </div>
            <Photos
                photoList={albumData.photos}
                sharedPhotosData={sharedPhotosData}
                photoLibraryEndpoint={photoLibraryEndpoint}
            />
        </div>
    )
}

export default Album
