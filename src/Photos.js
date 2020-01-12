import React, { useState, useCallback } from 'react';
import {
    useParams,
    useHistory
} from "react-router-dom";
import Gallery from "react-photo-gallery";
import FsLightbox from 'fslightbox-react'; 


function Photos(props) {
    let history = useHistory();
    let { photoId } = useParams();

    // remapping of the photo list
    const photoThumbnails = props.list.map(photo => { return { 
        src: photo.thumbnailUrl,
        srcSet: [
            props.photoLibraryEndpoint + photo.thumbnailUrl + " 1x",
            props.photoLibraryEndpoint + photo.thumbnail2xUrl + " 2x"
        ],
        width: photo.width,
        height: photo.height,
        key: photo.id.toString()
    } });
    const photos = props.list.map(photo => props.photoLibraryEndpoint + photo.photoUrl);

    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        sourceIndex: photoThumbnails.findIndex(photoThumbnail => photoThumbnail.key === photoId)
    });

    // if (photoId){
    //     setLightboxController({
    //         toggler: lightboxController.toggler,
    //         sourceIndex: photoThumbnails.findIndex(photoThumbnail => photoThumbnail.key === photoId)
    //     });
    // }

    const openLightboxOnSlide = useCallback((event, { photo, index }) => { 
        history.push("/photos/" + photo.key);
        setLightboxController({
            toggler: !lightboxController.toggler,
            sourceIndex: index
        });
    }, [history, lightboxController]);

    return (
        <>
            <Gallery photos={photoThumbnails} onClick={openLightboxOnSlide} margin={2}/>
            <FsLightbox
                toggler={lightboxController.toggler}
                sources={photos}
                type="image"
                sourceIndex={lightboxController.sourceIndex}
                openOnMount={photoId ? true : false}
                onClose={() => { history.push("/"); }}
            />
        </>
    );
}

export default Photos;