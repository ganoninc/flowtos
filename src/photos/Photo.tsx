import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import type { ScrollPosition } from 'react-lazy-load-image-component'
import type { Photo as PhotoType } from '../types'

import './Photo.scss'

export type PhotoProps = {
    photo: PhotoType
    margin: string
    onClick: (photoId: string) => void
    scrollPosition: ScrollPosition
}

export const Photo = (props: PhotoProps): React.JSX.Element => {
    const { photo, margin, onClick, scrollPosition } = props

    const styles = {
        margin,
        width: photo.width,
        height: photo.height,
        overflow: 'hidden',
        cursor: 'pointer',
    }

    const onClickHandler: React.MouseEventHandler<HTMLElement> = (event): void => {
        onClick(photo.id)
    }

    return (
        <div style={styles}>
            <LazyLoadImage
                alt={'A photo'}
                scrollPosition={scrollPosition}
                effect='blur'
                onClick={onClickHandler}
                threshold={250}
                wrapperClassName='lazy-loader'
                {...photo}
            />
        </div>
    )
}
