import React from 'react';
import AlbumCard from './AlbumCard'

function Albums(props) {
    let albumList = props.albumList.map(album => {
        let coverImg = props.photoLibraryEndpoint + album.photos[0].thumbnailUrl;
        let coverImg2x = props.photoLibraryEndpoint + album.photos[0].thumbnail2xUrl;
        
        return (
            <AlbumCard key={album.name} cover={coverImg} cover2x={coverImg2x} name={album.name}/>
        );
    });

    return (
        <div className="row justify-content-center">
            {albumList}
        </div>
    );
}

export default Albums;