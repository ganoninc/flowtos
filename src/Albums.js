import React from 'react';
import {
    useParams,
    useHistory
} from "react-router-dom";
import AlbumCard from './AlbumCard'

function Albums(props) {
    let history = useHistory();
    let { photoId } = useParams();

    const albumList = props.list.map(album => {
        const coverImg = props.photoLibraryEndpoint + album.photos[0].thumbnailUrl;
        return (
            <AlbumCard key={album.name} cover={coverImg} name={album.name}/>
        );
    });

    return (
        <div className="row justify-content-center">
            {albumList}
        </div>
    );
}

export default Albums;