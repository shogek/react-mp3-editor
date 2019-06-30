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
    editable: boolean;
    file: File;
    song?: Song;
};

class SongSquareContainer extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            editable: false,
            file: this.props.file,
            song: undefined
        };

        this.init = this.init.bind(this);
        this.onTagReadError = this.onTagReadError.bind(this);
        this.onTagReadSuccess = this.onTagReadSuccess.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
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

    onEditClick() {
        this.setState((prev, props) => ({
            editable: !prev.editable
        }));
    }

    render() {
        const { song, editable } = this.state;
        return song ? (<SongSquare editable={editable} song={song} onClickClose={this.onCloseClick} onClickEdit={this.onEditClick} />) : null;
    }
}

export default SongSquareContainer;