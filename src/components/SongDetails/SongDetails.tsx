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

    onInputChange(e, source) {
        const { editedSong } = this.state;
        const editedField = Object.keys(source)[0];
        editedSong[editedField] = e.target.value;
        this.setState({ editedSong });
    }

    render() {
        const { title, artist, album, year } = this.state.editedSong;

        return (
            <div className='row mzt-row-details'>
                <div className='col'>
                    {/* Title */}
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor="mzt-input-title">Title</label>
                                <input id="mzt-input-title" type="text" className="form-control"
                                    value={title}
                                    onChange={(e) => this.onInputChange(e, { title })} />
                            </div>
                        </div>
                    </div>

                    {/* Artist */}
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor="mzt-input-artist">Artist</label>
                                <input id="mzt-input-artist" type="text" className="form-control"
                                    value={artist}
                                    onChange={(e) => this.onInputChange(e, { artist })} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col'>
                    {/* Album */}
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor="mzt-input-album">Album</label>
                                <input id="mzt-input-album" type="text" className="form-control"
                                    value={album}
                                    onChange={(e) => this.onInputChange(e, { album })} />
                            </div>
                        </div>
                    </div>

                    {/* Year */}
                    <div className='row'>
                        <div className='col'>
                            <div className='form-group'>
                                <label htmlFor="mzt-input-year">Year</label>
                                <input id="mzt-input-year" type="number" className="form-control"
                                    value={year}
                                    onChange={(e) => this.onInputChange(e, { year })} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SongDetails;