import React from 'react';
import Tippy from '@tippy.js/react';
import Song from '../../models/song';
import DefaultCover from './cover_350x350.png';
import AlbumCover from '../../models/albumCover';
import './song-header.css';

type Props = {
  file: File;
  song: Song;
  albumCover?: AlbumCover,
  editableSong: Song;
  onToggleCutMode: Function;
  onToggleEditMode: Function;
  onClickDownload: Function;
  isCuttingEnabled: boolean;
  isEditingEnabled: boolean;
  isDownloadEnabled: boolean;
};

export default function songHeader(props: Props) {
  const {
    file,
    song,
    albumCover,
    editableSong,
    onToggleCutMode,
    onToggleEditMode,
    onClickDownload,
    isCuttingEnabled,
    isEditingEnabled,
    isDownloadEnabled,
  } = props;
  const title = `${song.title || '<NO TITLE>'} by ${song.artist || '<NO ARTIST>'}`;

  return (
    <div className="row align-items-center mzt-song-wrapper">

      {/* [IMAGE] Album cover */}
      <div className="col-auto">
        <img className="img-thumbnail"
          alt="album cover"
          src={albumCover ? albumCover.dataAsTagSrc : DefaultCover} />
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

        {/* Edit the song's tags */}
        <div className="row" onClick={() => onToggleEditMode()}>
          <Tippy content="Edit the song's tags" arrow={true} placement="right" delay={400}>
            <i className={`fas fa-pencil-alt mzt-btn-actions ${isEditingEnabled ? 'active' : ''}`}></i>
          </Tippy>
        </div>

        {/* Cut the song */}
        <div className="row" onClick={() => onToggleCutMode()}>
          <Tippy content="Cut the song" arrow={true} placement="right" delay={400}>
            <i className={`fas fa-cut mzt-btn-actions ${isCuttingEnabled ? 'active' : ''}`}></i>
          </Tippy>
        </div>

        {/* Download song */}
        <div className="row" onClick={() => onClickDownload()}>
          <Tippy content="Download the song" arrow={true} placement="right" delay={400}>
            <i className="fas fa-download mzt-btn-actions"></i>
          </Tippy>
        </div>
      </div>
    </div>
  );
}
