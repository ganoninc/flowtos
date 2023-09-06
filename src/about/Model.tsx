import React from 'react'
import type { Model as ModelType } from '../types'

import './Model.scss'

type ModelProps = Pick<ModelType, 'fullname' | 'thumbnailUrl' | 'thumbnail2xUrl' | 'instagram'>

export const Model = (props: ModelProps): React.JSX.Element => {
    const { instagram, thumbnailUrl, thumbnail2xUrl, fullname } = props

    const InstagramLink = (): React.JSX.Element => (
        <a
            className='instagram-link'
            href={'https://www.instagram.com/' + instagram}
            rel='noopener noreferrer'
            target='_blank'
        >
            @{instagram}
        </a>
    )

    return (
        <div className='d-flex flex-column align-items-start my-4 mx-3 model'>
            <img
                src={thumbnailUrl}
                alt={fullname}
                srcSet={thumbnailUrl + ' 1x, ' + thumbnail2xUrl + ' 2x'}
                sizes='125px'
                className='img-thumbnail mb-2 picture'
                width='125'
                height='125'
            />
            <div className='d-flex flex-column justify-content-center label'>
                <span className='fullname'>{fullname}</span>
                {instagram !== undefined && <InstagramLink />}
            </div>
        </div>
    )
}

export default Model
