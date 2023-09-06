import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import type { ScrollPosition } from 'react-lazy-load-image-component'
import { PhotoAlbumType } from './Photos'
import { ImageElementAttributes, NonOptional, PhotoLayout } from 'react-photo-album'

import './Photo.scss'

export type PhotoProps = {
    photo: PhotoAlbumType
    onClick: (photoId: string) => void
    scrollPosition: ScrollPosition
    layout: PhotoLayout
    computedImagesProps: NonOptional<ImageElementAttributes, 'style' | 'src' | 'alt'>
}

export const Photo = (props: PhotoProps): React.JSX.Element => {
    const { photo, onClick, scrollPosition, layout, computedImagesProps } = props

    const styles = {
        width: layout.width,
        height: layout.height,
        cursor: 'pointer',
        overflow: 'hidden',
        ...computedImagesProps.style,
    }

    const onClickHandler: React.MouseEventHandler<HTMLElement> = (): void => {
        onClick(photo.id)
    }

    const wrapperStyle = {
        display: 'block',
        width: '100%',
        height: 'auto',
    }

    return (
        <div style={styles}>
            <LazyLoadImage
                alt={'A photo'}
                scrollPosition={scrollPosition}
                placeholderSrc={photo.blurredThumbnailPlaceholderUrl}
                effect='blur'
                onClick={onClickHandler}
                threshold={250}
                wrapperClassName='lazy-loader'
                src={photo.src}
                width={layout.width}
                height={layout.height}
                style={{ display: 'block', width: '100%', height: 'auto' }}
                wrapperProps={{ style: wrapperStyle }}
                srcSet={computedImagesProps.srcSet}
            />
        </div>
    )
}
