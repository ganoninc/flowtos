import React from 'react';
import {
    useHistory
} from "react-router-dom";

import './AlbumCard.scss';

function AlbumCard(props){
    let history = useHistory();

    let openAlbum = () => {
        history.push("/albums/" + props.name);
    };

    return (
        <div className="mb-4 col-xs-12 col-sm-12 col-md-3">
            <div className="album-card" onClick={openAlbum}>
                <img src={props.cover} className="cover" alt="cover" srcSet={props.cover + " 1x, " + props.cover2x + " 2x"} />
                <span className="name">{props.name}</span>
            </div>
        </div>
    );
};

export default AlbumCard;