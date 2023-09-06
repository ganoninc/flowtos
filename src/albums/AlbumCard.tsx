import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { RouteBuilder } from '../routes'
import type { ScrollPosition } from 'react-lazy-load-image-component'

import './AlbumCard.scss'

type AlbumCardProps = {
    name: string
    albumId: string
    cover: string
    cover2x: string
    placeholderSrc: string
    scrollPosition: ScrollPosition
}

export const AlbumCard = (props: AlbumCardProps): React.JSX.Element => {
    const { name, albumId, cover, cover2x, placeholderSrc, scrollPosition } = props
    const navigate = useNavigate()

    const openAlbum = (): void => {
        navigate(RouteBuilder.buildViewAlbumRoute(albumId))
    }

    return (
        <div className='mb-4 col-xs-12 col-sm-12 col-md-4 col-lg-3'>
            <div className='album-card' onClick={openAlbum}>
                <LazyLoadImage
                    alt={name}
                    scrollPosition={scrollPosition}
                    effect='blur'
                    placeholderSrc={placeholderSrc}
                    src={cover}
                    className='cover'
                    srcSet={cover + ' 1x, ' + cover2x + ' 2x'}
                    threshold={250}
                    wrapperClassName='lazy-loader'
                />
                <span className='py-2 name'>{name}</span>
            </div>
        </div>
    )
}
