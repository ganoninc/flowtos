import React, { useState, useCallback } from 'react';
import Gallery from "react-photo-gallery";
import FsLightbox from 'fslightbox-react'; 


function Photos(props) {
    // remapping of the photo list
    const photoThumbnails = props.list.map(photo => { return { src: photo.thumbnailUrl, width: photo.width, height: photo.height, key: photo.id.toString()} });
    const photos = props.list.map(photo => photo.photoUrl);

    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: null
    }); 

    const openLightboxOnSlide = useCallback((event, { photo, index }) => { 
        setLightboxController({
            toggler: !lightboxController.toggler,
            slide: index + 1
        });
    }, [lightboxController]);
    
    return (
        <>
            <Gallery photos={photoThumbnails} onClick={openLightboxOnSlide}/>
            <FsLightbox
                toggler={lightboxController.toggler}
                sources={photos}
                slide={lightboxController.slide}
            /> 
        </>
    );
}

export default Photos;