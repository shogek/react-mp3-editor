import React, { Component } from 'react';
import TagReader from 'jsmediatags';
import Song from '../../models/song';
import AlbumCover from "../../models/albumCover";
import DefaultCover from './cover_350x350.png';
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
        if (!song)
            return null;

        return (
            <div className='row mzt-row-song align-items-center'>
                <div className='col-auto'>
                    <img
                        className='img-thumbnail'
                        alt='album cover'
                        src={song.albumCover ? song.albumCover.dataAsTagSrc : DefaultCover} />
                </div>

                <div className='col mzt-song-text'>
                    <div className='row'>
                        <div className='col'>
                            <h3>{song.title}</h3>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <h4>{song.artist}</h4>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <h4>{song.album}</h4>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <h4>{song.year}</h4>
                        </div>
                    </div>
                </div>

                <div className='col-1'>
                    {/* Remove song from list */}
                    <div className='row' title='Remove song from list' onClick={this.onCloseClick}>
                        <i className="fas fa-times mzt-btn-actions"></i>
                    </div>

                    {/* Edit song */}
                    <div className='row' title='Edit song'>
                        <i className="fas fa-pencil-alt mzt-btn-actions"></i>
                    </div>

                    {/* Download song */}
                    <div className='row' title='Download song'>
                        <i className="fas fa-download mzt-btn-actions"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default SongSquareContainer;