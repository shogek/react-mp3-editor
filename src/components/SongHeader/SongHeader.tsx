import React from 'react';
import Tippy from '@tippy.js/react';
import Song from '../../models/song';
import DefaultCover from './cover_350x350.png';
import './song-header.css';

type Props = {
  file: File;
  song: Song;
  editableSong: Song;
  onClickCut: Function;
  onClickEdit: Function;
  onClickRemove: Function;
  onClickDownload: Function;
  isCuttingEnabled: boolean;
  isEditingEnabled: boolean;
};

export default function songHeader(props: Props) {
  const {
    file,
    song,
    editableSong,
    onClickCut,
    onClickEdit,
    onClickRemove,
    onClickDownload,
    isCuttingEnabled,
    isEditingEnabled,
  } = props;
  const title = `${song.title || '<NO TITLE>'} by ${song.artist || '<NO ARTIST>'}`;

  return (
    <div className="row align-items-center mzt-song-wrapper">

      {/* [IMAGE] Album cover */}
      <div className="col-auto">
        <img className="img-thumbnail"
          alt="album cover"
          src={editableSong.albumCover ? editableSong.albumCover.dataAsTagSrc : DefaultCover} />
      </div>

      {/* [TEXT] File name */}
      <div className="col mzt-col-song-header">
        <div className="row">
          <div className="col">
            <h3>
              <span className="mzt-song-filename">{file.name}</span>
            </h3>
          </div>
        </div>

        {/* [TEXT] Parsed title */}
        <div className="row">
          <div className="col">
            <h4>
              <span className="mzt-song-title">{title}</span>
            </h4>
          </div>
        </div>
      </div>

      {/* [BUTTONS] */}
      <div className="col-1">

        {/* Remove song from list */}
        <div className="row" onClick={() => onClickRemove()}>
          <Tippy content="Remove the song from list" arrow={true} placement="right" delay={400}>
            <i className="fas fa-times mzt-btn-actions"></i>
          </Tippy>
        </div>

        {/* Edit the song's tags */}
        <div className="row" onClick={() => onClickEdit()}>
          <Tippy content="Edit the song's tags" arrow={true} placement="right" delay={400}>
            <i className={`fas fa-pencil-alt mzt-btn-actions ${isEditingEnabled ? 'active' : ''}`}></i>
          </Tippy>
        </div>

        {/* Cut the song */}
        <div className="row" onClick={() => onClickCut()}>
          <Tippy content="Cut the song" arrow={true} placement="right" delay={400}>
            <i className={`fas fa-cut mzt-btn-actions ${isCuttingEnabled ? 'active' : ''}`}></i>
          </Tippy>
        </div>

        {/* // TODO: Allow download when song edited in some way */}
        {/* Download song */}
        {/* <div className='row' onClick={() => handleClickDownload()}>
          <Tippy content='Download the song' arrow={true} placement='right' delay={400}>
            <i className="fas fa-download mzt-btn-actions"></i>
          </Tippy>
        </div> */}
      </div>
    </div>
  );
}
