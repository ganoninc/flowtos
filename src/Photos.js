import React from 'react';
import Gallery from "react-photo-gallery";

function Photos(props) {
    console.log(props);
    const photos = props.list.map(photo => { return { src: photo.thumbnailUrl, width: photo.width, height: photo.height} });
    console.log(photos);
    return <Gallery photos={photos} />;
}

export default Photos;