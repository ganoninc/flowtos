import React from 'react';
import './AlbumCard.scss';

function AlbumCard(props){
    return (
        <div className="mb-4 col-xs-12 col-sm-12 col-md-3">
            <div className="album-card">
                <img src={props.cover} className="cover" alt="cover"/>
                <span className="name">{props.name}</span>
            </div>
        </div>
    );
};

export default AlbumCard;