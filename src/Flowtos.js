import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './Flowtos.scss';
import LoadingIndicator from './LoadingIndicator'
import Photos from './Photos';
import Albums from './Albums';
import Album from './Album';
import CategorySelector from './CategorySelector'

class Flowtos extends React.Component {

    PHOTO_LIBRARY_ENDPOINT = "https://giovanetti.fr/flowtos/photo-library-ressources/";

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isPhotoLibraryIndexLoaded: false,
            allPhotosIndex: []
        };

        if (process.env.NODE_ENV !== 'production') {
            this.PHOTO_LIBRARY_ENDPOINT = "http://localhost:3000/photo-library-ressources/";
        }
    }

    componentDidMount() {
        fetch(this.PHOTO_LIBRARY_ENDPOINT + "index.json")
            .then(res => res.json())
            .then(
                (photoLibraryIndex) => {
                    this.setState({
                        isPhotoLibraryIndexLoaded: true,
                        allPhotosIndex: photoLibraryIndex.all_photos,
                        albumsIndex: photoLibraryIndex.albums

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
        const { error, isPhotoLibraryIndexLoaded, allPhotosIndex, albumsIndex } = this.state;

        if (error) {
            photosView = <div>Error while loading Flowtos: {error.message}</div>;
        }
        else if (isPhotoLibraryIndexLoaded) {
            photosView = (
                <>
                <Switch>
                    <Route path="/photos/:photoId">
                        <Photos photoList={allPhotosIndex} photoLibraryEndpoint={this.PHOTO_LIBRARY_ENDPOINT} />
                    </Route>
                    <Route exact path="/albums/:albumId">
                        <Album albumList={albumsIndex} photoLibraryEndpoint={this.PHOTO_LIBRARY_ENDPOINT} />
                    </Route>
                    <Route exact path="/albums/:albumId/:photoId">
                        <Album albumList={albumsIndex} photoLibraryEndpoint={this.PHOTO_LIBRARY_ENDPOINT} />
                    </Route>
                    <Route path="/albums">
                        <Albums albumList={albumsIndex} photoLibraryEndpoint={this.PHOTO_LIBRARY_ENDPOINT} />
                    </Route>
                    <Route path="/">
                        <Photos photoList={allPhotosIndex} photoLibraryEndpoint={this.PHOTO_LIBRARY_ENDPOINT} />
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
                            <header className="Flowtos-header pt-5 pb-4">
                                <span className="text-muted">Romain J. Giovanetti</span>
                                <h1 className="pt-2">Jeu de Lumières</h1>
                                <Switch>
                                    <Route path="/photos/:photoId">
                                        <CategorySelector selected="latest-photos" />
                                    </Route>
                                    <Route path="/albums">
                                        <CategorySelector selected="albums" />
                                    </Route>
                                    <Route path="/">
                                        <CategorySelector selected="latest-photos" />
                                    </Route>
                                </Switch>
                            </header>
                            <main>
                                {photosView}
                            </main>
                            <footer className="footer mt-auto py-4">
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