import React from 'react';
import {
    useParams,
    useHistory
} from "react-router-dom";
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

function Albums(props) {
    let history = useHistory();
    let { photoId } = useParams();

    const albumList = (
        <CardDeck>
            {
                props.list.map(album => {
                    const coverImg = props.photoLibraryEndpoint + album.photos[0].thumbnailUrl;
                    return (
                        <Card key={album.name} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={coverImg} />
                            <Card.Body>
                                <Card.Title>{album.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    );
                })
            }
        </CardDeck>
    );

    return (
        <>
            {albumList}
        </>
    );
}

export default Albums;