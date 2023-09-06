import React from 'react'

export const ErrorMessage = (): React.JSX.Element => {
    return (
        <div className='mb-4'>
            <p>Error while loading the photo library index. Please try again later.</p>
        </div>
    )
}
