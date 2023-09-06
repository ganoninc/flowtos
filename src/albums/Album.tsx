import React from 'react'
import { useParams } from 'react-router-dom'
import { Photos } from '../photos/Photos'
import type { Album as AlbumType, Photo } from '../types'

type AlbumProps = {
    albumList: AlbumType[]
    sharedPhotosData: Photo[]
    photoLibraryEndpoint: string
}

export const Album = (props: AlbumProps): React.JSX.Element => {
    const { albumList, sharedPhotosData, photoLibraryEndpoint } = props
    const { albumId } = useParams()

    if (albumId === undefined) throw new Error('Missing albumId')

    const albumData = albumList.find((album) => album.encodedName === encodeURI(albumId))

    if (albumData === undefined) throw new Error('Missing albumData')

    const photoList = albumData.photos

    return (
        <div>
            <h3 className='pb-3'>{albumData.name}</h3>
            <Photos
                photoList={photoList}
                sharedPhotosData={sharedPhotosData}
                photoLibraryEndpoint={photoLibraryEndpoint}
            />
        </div>
    )
}
