import { LazyLoadImage } from 'react-lazy-load-image-component'
import type { ScrollPosition } from 'react-lazy-load-image-component'
import type { RenderImageProps } from 'react-photo-album'
import { PhotoAlbumType } from './Photos'

import './Photo.scss'

export type PhotoProps = {
    photo: PhotoAlbumType
    scrollPosition: ScrollPosition
    width: number
    height: number
    computedImageProps: RenderImageProps
}

const Photo = (props: PhotoProps) => {
    const { photo, scrollPosition, width, height, computedImageProps } = props

    const wrapperStyle = {
        display: 'block',
        width: '100%',
        height: 'auto',
    }

    return (
        <LazyLoadImage
            alt={'A photo'}
            scrollPosition={scrollPosition}
            placeholderSrc={photo.blurredThumbnailPlaceholderUrl}
            effect='blur'
            threshold={250}
            wrapperClassName='lazy-loader'
            src={computedImageProps.src}
            srcSet={computedImageProps.srcSet}
            sizes={computedImageProps.sizes}
            width={width}
            height={height}
            style={{ display: 'block', width: '100%', height: 'auto' }}
            wrapperProps={{ style: wrapperStyle }}
        />
    )
}

export default Photo
