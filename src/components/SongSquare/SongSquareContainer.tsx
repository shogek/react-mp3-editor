import React, { Component } from 'react';
import Song from '../../models/song';
import AlbumCover from "../../models/albumCover";
import SongHelper from '../../helpers/songHelper';
import SongSquare from "./SongSquare";
import "./song-square.css";

type Props = {
    file: File;
    song: Song;
    handleSongRemove: Function;
};

type State = {
    file: File;
    song: Song;
    editable: boolean;
};

class SongSquareContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            file: props.file,
            song: props.song,
            editable: false
        };

        this.onTagReadError = this.onTagReadError.bind(this);
        this.onTagReadSuccess = this.onTagReadSuccess.bind(this);
        this.onCloseClick = this.onCloseClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onDownloadClick = this.onDownloadClick.bind(this);
        this.onSongEdited = this.onSongEdited.bind(this);
    }

    onSongEdited(song: Song) {
        this.setState({ song });
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

    onDownloadClick() {
        const { file, song } = this.state;

        const reader = new FileReader();
        reader.onload = () => this.onFileReadSuccess(reader, file, song);
        reader.onerror = this.onFileReadError;
        reader.onprogress = this.onFileReadProgress;
        reader.readAsArrayBuffer(this.state.file);
    }

    onFileReadSuccess(reader: FileReader, file: File, song: Song) {
        const arrayBuffer = reader.result as ArrayBuffer;
        SongHelper.downloadSong(arrayBuffer, song, file.name);
    }

    onFileReadError(a) {
        debugger;
    }

    onFileReadProgress(e: ProgressEvent) {
        console.log(e.loaded / e.total);
    }

    render() {
        const { song, editable } = this.state;
        return !song
            ? null
            : (<SongSquare editable={editable} song={song}
                onClickClose={this.onCloseClick}
                onClickEdit={this.onEditClick}
                onClickDownload={this.onDownloadClick}
                onSongEdited={this.onSongEdited}
            />);
    }
}

export default SongSquareContainer;