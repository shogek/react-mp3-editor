import React, { Component } from 'react';
import Song from '../../models/song';

type Props = {
    originalSong: Song;
};
type State = {
    editedSong: Song;
};

class SongDetails extends Component<Props, State> {
    constructor(props) {
        super(props);

        const oldSong = props.originalSong;
        const newSong = new Song(oldSong.artist, oldSong.title, oldSong.album, oldSong.year);

        this.state = {
            editedSong: newSong
        };

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e, source: string) {
        const { editedSong } = this.state;
        const newValue = e.target.value;

        if (source === 'title')
            editedSong.title = newValue;
        if (source === 'artist')
            editedSong.artist = newValue;
        if (source === 'album')
            editedSong.album = newValue;
        if (source === 'year')
            editedSong.year = newValue;

        this.setState({ editedSong });
    }

    render() {
        const song = this.state.editedSong;

        return (
            // <div className='row mzt-row-song'>
            <div className='row'>
                <div className='col'>
                    {/* Title */}
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor="mzt-input-title">Title</label>
                                <input id="mzt-input-title" type="text" className="form-control"
                                    value={song.title}
                                    onChange={(e) => this.onInputChange(e, 'title')} />
                            </div>
                        </div>
                    </div>

                    {/* Artist */}
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor="mzt-input-artist">Artist</label>
                                <input id="mzt-input-artist" type="text" className="form-control"
                                    value={song.artist}
                                    onChange={(e) => this.onInputChange(e, 'artist')} />
                            </div>
                        </div>
                    </div>

                    {/* Album */}
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor="mzt-input-album">Album</label>
                                <input id="mzt-input-album" type="text" className="form-control"
                                    value={song.album}
                                    onChange={(e) => this.onInputChange(e, 'album')} />
                            </div>
                        </div>
                    </div>

                    {/* Year */}
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor="mzt-input-year">Year</label>
                                <input id="mzt-input-year" type="number" className="form-control"
                                    value={song.year}
                                    onChange={(e) => this.onInputChange(e, 'year')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SongDetails;