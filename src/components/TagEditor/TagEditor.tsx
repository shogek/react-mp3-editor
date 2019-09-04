import React from 'react';
import Song from '../../models/song';
import './tag-editor.css';

type Props = {
    originalSong: Song;
    handleSongEdit: Function;
    handleCoverUpload: Function;
};

function onInputClicked() {
    const input = document.getElementById("btn-upload-cover");
    if (input)
        input.click();
}

function TagEditor(props: Props) {
    const { title, artist, album, year } = props.originalSong;

    return (
        <div className='row mzt-row-details'>
            <div className='col'>
                <div className='row'>
                    <div className='col'>
                        {/* Title */}
                        <div className='row'>
                            <div className='col'>
                                <div className='form-group'>
                                    <label htmlFor="mzt-input-title">Title</label>
                                    <input id="mzt-input-title" type="text" className="form-control"
                                        value={title}
                                        onChange={(e) => props.handleSongEdit(props.originalSong, { title }, e.target.value)} />
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
                                        onChange={(e) => props.handleSongEdit(props.originalSong, { artist }, e.target.value)} />
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
                                        onChange={(e) => props.handleSongEdit(props.originalSong, { album }, e.target.value)} />
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
                                        onChange={(e) => props.handleSongEdit(props.originalSong, { year }, e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        {/* Hidden */}
                        <input
                            id="btn-upload-cover"
                            className='mzt-invisible'
                            type='file'
                            accept='.png,.jpg,.jpeg'
                            onChange={(e) => props.handleCoverUpload(e)} />

                        {/* Visible */}
                        <div
                            className="btn btn-primary"
                            onClick={onInputClicked}>
                            Upload album cover
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default TagEditor;