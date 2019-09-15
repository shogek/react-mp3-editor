import React from 'react';
import Tippy from '@tippy.js/react';
import Song from '../../models/song';
import DefaultCover from './cover_350x350.png';
import './song-header.css';

type Props = {
    file: File;
    song: Song;
    editableSong: Song;
    handleClickDownload: Function;
    handleClickExpand: Function;
    handleClickRemove: Function;
};

function SongHeader(props: Props) {
    const { file, song, editableSong, handleClickDownload, handleClickExpand, handleClickRemove } = props;
    const title = `${song.title || '<NO TITLE>'} by ${song.artist || '<NO ARTIST>'}`;

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
                            <span className='mzt-song-filename'>{file.name}</span>
                        </h3>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <h4>
                            <span className='mzt-song-title'>{title}</span>
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
                <div className='row' onClick={() => handleClickDownload()}>
                    <Tippy content='Download the song' arrow={true} placement='right' delay={400}>
                        <i className="fas fa-download mzt-btn-actions"></i>
                    </Tippy>
                </div>
            </div>
        </div>
    );
}

export default SongHeader;