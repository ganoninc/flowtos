import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './Flowtos.scss';
import LoadingIndicator from './LoadingIndicator'
import Photos from './Photos';

class Flowtos extends React.Component {

    FLOWTOS_ENDPOINT = "https://giovanetti.fr/flowtos/photo-library-ressources/";

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isPhotoLibraryIndexLoaded: false,
            photoLibraryIndex: []
        };

        if (process.env.NODE_ENV !== 'production') {
            this.PHOTO_LIBRARY_ENDPOINT = "http://localhost:3000/photo-library-ressources/";
        }
    }

    componentDidMount() {
        fetch(this.PHOTO_LIBRARY_ENDPOINT + "index.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isPhotoLibraryIndexLoaded: true,
                        photoLibraryIndex: result.all_photos
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        let photosView;
        const { error, isPhotoLibraryIndexLoaded, photoLibraryIndex } = this.state;

        if (error) {
            photosView = <div>Error while loading Flowtos: {error.message}</div>;
        }
        else if (isPhotoLibraryIndexLoaded) {
            photosView = (
                <>
                <Switch>
                    <Route path="/photos/:photoId" children={<Photos list={photoLibraryIndex} photoLibraryEndpoint={this.PHOTO_LIBRARY_ENDPOINT} />} />
                    <Route path="/">
                            <Photos list={photoLibraryIndex} photoLibraryEndpoint={this.PHOTO_LIBRARY_ENDPOINT} />
                    </Route>
                </Switch>
                </>
            );
        } else {
            photosView = <LoadingIndicator />;
        }

        return (
            <>
                <Router>
                    <div className="container">
                        <div className="Flowtos">
                            <header className="Flowtos-header py-5">
                                <span className="text-muted">Romain J. Giovanetti</span>
                                <h1 className="pt-2">Jeu de Lumières</h1>
                            </header>
                            <main>
                                {photosView}
                            </main>
                            <footer className="footer mt-auto py-2">
                                <div className="container">
                                    <span className="text-muted">All images © 2002-2020 <a href="https://www.giovanetti.fr/">Romain J. Giovanetti</a> (@Gioroju). </span>
                                </div>
                            </footer>
                        </div>
                    </div>
                </Router>
            </>
        );
    }
}

export default Flowtos;