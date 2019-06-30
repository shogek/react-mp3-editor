import React, { Component } from 'react';
import TagReader from 'jsmediatags';
import Song from '../../models/song';
import AlbumCover from "../../models/albumCover";
import SongSquare from "./SongSquare";
import "./song-square.css";

type Props = {
    file: File;
    handleSongRemove: Function;
};

type State = {
    file: File;
    song?: Song;
};

class SongSquareContainer extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            file: this.props.file,
            song: undefined
        };

        this.init = this.init.bind(this);
        this.onTagReadError = this.onTagReadError.bind(this);
        this.onTagReadSuccess = this.onTagReadSuccess.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.init();
    }

    init() {
        const { file } = this.props;

        TagReader.read(
            file,
            {
                onSuccess: this.onTagReadSuccess,
                onError: this.onTagReadError
            }
        );
    }

    onTagReadSuccess(tags) {
        const { artist, title, album, year, /*genre, trackNo,*/ picture } = tags.tags;

        const cover = !picture ? undefined
            : new AlbumCover(picture.format, picture.data, picture.description, picture.type);

        const song = new Song(artist, title, album, year, cover);
        this.setState({ song });
    }

    onTagReadError(error) {
        console.log(error);
        debugger;
    }

    onCloseClick() {
        this.props.handleSongRemove(this.state.file.name);
    }

    render() {
        const { song } = this.state;
        return song ? (<SongSquare song={song} onClickClose={this.onCloseClick} />) : null;
    }
}

export default SongSquareContainer;