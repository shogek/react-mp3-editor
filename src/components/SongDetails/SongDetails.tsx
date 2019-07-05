import React, { Component } from 'react';
import Song from '../../models/song';

type Props = {
    originalSong: Song;
    onEdit: Function;
};
type State = {
    hasUnsavedChanges: boolean;
    editedSong: Song;
};

class SongDetails extends Component<Props, State> {
    constructor(props) {
        super(props);

        const oldSong = props.originalSong as Song;
        const newSong = new Song(oldSong.artist, oldSong.title, oldSong.album, oldSong.year, oldSong.albumCover);

        this.state = {
            hasUnsavedChanges: false,
            editedSong: newSong
        };

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e, source) {
        const { editedSong } = this.state;
        const editedField = Object.keys(source)[0];
        editedSong[editedField] = e.target.value;
        const hasUnsavedChanges = areSongsDifferent(this.props.originalSong, editedSong);
        this.setState({
            hasUnsavedChanges,
            editedSong
        });

        this.props.onEdit(editedSong, hasUnsavedChanges);
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

function areSongsDifferent(source: Song, target: Song): boolean {
    const fields = Object.keys(source);
    for (var field of fields)
        if (source[field] !== target[field])
            return true;

    return false;
}

export default SongDetails;