import React, { Component } from 'react';
import TagReader from 'jsmediatags';
import TagWriter from 'browser-id3-writer';
import FileSaver from 'file-saver';
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
        this.onDownloadClick = this.onDownloadClick.bind(this);
        this.onSongDownloaded = this.onSongDownloaded.bind(this);
        this.onSongEdited = this.onSongEdited.bind(this);
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

    onSongEdited(song: Song, hasUnsavedChanges: boolean) {
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
        if (!song) return;

        const reader = new FileReader();
        reader.onload = () => this.onFileReadSuccess(reader, file, song);
        reader.onerror = this.onFileReadError;
        reader.onprogress = this.onFileReadProgress;
        reader.readAsArrayBuffer(this.state.file);
    }

    onSongDownloaded(downloadedSong: Song) {
        this.setState({
            song: downloadedSong
        });
    }

    onFileReadSuccess(reader: FileReader, file: File, song: Song) {
        const arrayBuffer = reader.result as ArrayBuffer;
        const writer = new TagWriter(arrayBuffer);
        writer.setFrame("TIT2", song.title);
        writer.setFrame("TPE1", [song.artist]);
        writer.setFrame("TALB", song.album);
        writer.setFrame("TYER", song.year);
        writer.addTag();

        FileSaver.saveAs(writer.getBlob(), file.name);
        this.onSongDownloaded(song);
    }

    onFileReadError(a) {
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