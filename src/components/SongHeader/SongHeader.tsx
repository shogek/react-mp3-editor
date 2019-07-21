import React from 'react';
import Song from '../../models/song';
import DefaultCover from './cover_350x350.png';
import './song-header.css';

type Props = {
    song: Song;
    editableSong: Song;
    handleClickDownload: Function;
    handleClickExpand: Function;
    handleClickRemove: Function;
};

function SongHeader(props: Props) {
    const { song, editableSong, handleClickDownload, handleClickExpand, handleClickRemove } = props;

    return (
        <div className='row align-items-center mzt-song-wrapper'>
            <div className='col-auto'>
                <img
                    id='yo'
                    className='img-thumbnail'
                    alt='album cover'
                    src={editableSong.albumCover ? editableSong.albumCover.dataAsTagSrc : DefaultCover} />
            </div>

            <div className='col mzt-col-song-header' onClick={() => handleClickExpand()}>
                <div className='row'>
                    <div className='col'>
                        <h3>
                            <span className='mzt-song-title'>{song.title}</span>
                        </h3>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <h4>
                            <span className='mzt-song-artist'>{song.artist}</span>
                        </h4>
                    </div>
                </div>
            </div>

            <div className='col-1'>
                {/* Remove song from list */}
                <div className='row' title='Remove song from list' onClick={() => handleClickRemove()}>
                    <i className="fas fa-times mzt-btn-actions"></i>
                </div>

                {/* Download song */}
                <div className='row' title='Download song' onClick={() => handleClickDownload()}>
                    <i className="fas fa-download mzt-btn-actions"></i>
                </div>
            </div>
        </div>
    );
}

export default SongHeader;