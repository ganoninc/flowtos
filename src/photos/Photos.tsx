import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PhotoAlbum from 'react-photo-album'
import type { Image, RenderPhoto } from 'react-photo-album'
import FsLightbox from 'fslightbox-react'
import { trackWindowScroll } from 'react-lazy-load-image-component'
import type { ScrollPosition } from 'react-lazy-load-image-component'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Photo } from './Photo'
import type { PhotoProps } from './Photo'
import { RouteBuilder, Route } from '../routes'
import type { Photo as PhotoType, PhotoReference } from '../types'

import './Photos.scss'

type PhotosProps = {
    photoList: PhotoReference[]
    sharedPhotosData: PhotoType[]
    photoLibraryEndpoint: string
    scrollPosition: ScrollPosition
}

type PhotoAlbum = PhotoType & { src: string; srcSet: Image[]; key: string; placeholderSrc: string }

export const Photos = trackWindowScroll((props: PhotosProps): React.JSX.Element => {
    const { photoList, sharedPhotosData, photoLibraryEndpoint, scrollPosition } = props
    const navigate = useNavigate()
    const { photoId, albumId } = useParams()

    const photoThumbnails: PhotoAlbum[] = photoList.map((photo): PhotoAlbum => {
        const photoData = sharedPhotosData[photo.sharedPhotosDataIndex]
        return {
            ...photoData,
            src: photoLibraryEndpoint + photoData.thumbnailUrl,
            srcSet: [
                {
                    src: photoData.thumbnailUrl,
                    width: photoData.width,
                    height: photoData.height,
                },
                {
                    src: photoData.thumbnail2xUrl,
                    width: photoData.width * 2,
                    height: photoData.height * 2,
                },
            ],
            width: photoData.width,
            height: photoData.height,
            key: photoData.id,
            placeholderSrc: photoData.blurredThumbnailPlaceholderUrl,
        }
    })

    const chunk: <T>(arr: T[], size: number) => T[][] = (arr, size) =>
        Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
            arr.slice(i * size, i * size + size),
        )
    const photoThumbnailChunks = chunk(photoThumbnails, 50)

    const [infiniteScrollerController, setInfiniteScrollerController] = useState({
        currentChuck: [photoThumbnailChunks[0]],
        hasMore: true,
        chunckToLoadOnNextCallIndex: 1,
    })

    const loadNextPhotoThumbnailChunk = (): void => {
        if (infiniteScrollerController.currentChuck.length === photoThumbnailChunks.length) {
            setInfiniteScrollerController({
                ...infiniteScrollerController,
                hasMore: false,
            })
        } else {
            const chunckToLoadIndex = infiniteScrollerController.chunckToLoadOnNextCallIndex
            setInfiniteScrollerController({
                currentChuck: [
                    ...infiniteScrollerController.currentChuck,
                    photoThumbnailChunks[chunckToLoadIndex],
                ],
                hasMore: true,
                chunckToLoadOnNextCallIndex: chunckToLoadIndex + 1,
            })
        }
    }

    const photos = photoList.map((photo): string => {
        const photoData = sharedPhotosData[photo.sharedPhotosDataIndex]
        if (window.devicePixelRatio > 1) {
            return photoLibraryEndpoint + photoData.photo2xUrl
        } else {
            return photoLibraryEndpoint + photoData.photoUrl
        }
    })

    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        sourceIndex: photoThumbnails.findIndex((photoThumbnail) => photoThumbnail.key === photoId),
    })

    const openLightbox = (photoId: string): void => {
        if (albumId !== undefined) {
            navigate(RouteBuilder.buildViewPhotoInAlbumRoute(albumId, photoId))
        } else {
            navigate(RouteBuilder.buildViewPhotoInAllPhotosRoute(photoId))
        }
        setLightboxController({
            ...lightboxController,
            toggler: !lightboxController.toggler,
        })
    }

    const onLightBoxCloseHandler = (): void => {
        if (albumId !== undefined) {
            navigate(RouteBuilder.buildViewAlbumRoute(albumId))
        } else {
            navigate(Route.HOME)
        }
    }

    const customPhotoRenderer = ({ photo }: { photo: PhotoAlbum }) => (
        <Photo
            scrollPosition={scrollPosition}
            key={photo.key}
            margin=''
            photo={photo}
            onClick={openLightbox}
        />
    )

    const infiniteScrollItems: React.JSX.Element[] = []
    infiniteScrollerController.currentChuck.map((item, index): number => {
        return infiniteScrollItems.push(
            <div key={index} className='photos-chunk'>
                <PhotoAlbum<PhotoAlbum>
                    photos={item}
                    layout='rows'
                    renderPhoto={customPhotoRenderer}
                />
            </div>,
        )
    })

    return (
        <div className='mb-4 photos'>
            <FsLightbox
                toggler={lightboxController.toggler}
                sources={photos}
                type='image'
                sourceIndex={lightboxController.sourceIndex}
                openOnMount={photoId !== undefined}
                onClose={onLightBoxCloseHandler}
            />
            <InfiniteScroll
                dataLength={infiniteScrollerController.currentChuck.length}
                next={loadNextPhotoThumbnailChunk}
                hasMore={infiniteScrollerController.hasMore}
                loader={undefined}
            >
                {infiniteScrollItems}
            </InfiniteScroll>
        </div>
    )
})
