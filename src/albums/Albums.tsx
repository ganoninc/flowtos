import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { trackWindowScroll } from 'react-lazy-load-image-component'
import type { ScrollPosition } from 'react-lazy-load-image-component'
import { AlbumCard } from './AlbumCard'
import type { Album, Photo } from '../types'
import { Container, Row } from 'react-bootstrap'

import './Albums.scss'

type AlbumsProps = {
    albumList: Album[]
    sharedPhotosData: Photo[]
    photoLibraryEndpoint: string
    scrollPosition: ScrollPosition
}

export const Albums = trackWindowScroll((props: AlbumsProps): React.JSX.Element => {
    const { albumList, sharedPhotosData, photoLibraryEndpoint, scrollPosition } = props

    const albumListComponents = albumList.map((album) => {
        const photoData = sharedPhotosData[album.photos[0].sharedPhotosDataIndex]
        const coverImg = photoLibraryEndpoint + photoData.thumbnail.url
        const coverImg2x = photoLibraryEndpoint + photoData.thumbnail2x.url
        const placeholderSrc = photoData.blurredThumbnailPlaceholderUrl

        return (
            <AlbumCard
                key={album.name}
                cover={coverImg}
                cover2x={coverImg2x}
                placeholderSrc={placeholderSrc}
                name={album.name}
                albumId={album.encodedName}
                scrollPosition={scrollPosition}
            />
        )
    })

    return (
        <CSSTransition in={true} timeout={0} classNames='fade' appear>
            <Container className='albums'>
                <Row className='justify-content-center'>{albumListComponents}</Row>
            </Container>
        </CSSTransition>
    )
})
