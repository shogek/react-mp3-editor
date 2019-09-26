import React, { Component, ChangeEvent } from 'react';
import Tippy from '@tippy.js/react';
import Song from '../../models/song';
import AlbumCover from '../../models/albumCover';
import './tag-editor.css';

type Props = {
  originalSong: Song;
  onSaveChanges: Function;
  onUploadCover: Function;
  onCancelChanges: Function;
};
type State = {
  editableSong: Song;
  wasSongEdited: boolean;
};

// TODO: Show unsaved changes on modified fields.
function handleInputClicked() {
  const input = document.getElementById('btn-upload-cover');
  if (input) {
    input.click();
  }
}

class TagEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const { originalSong } = this.props;

    this.state = {
      editableSong: originalSong.clone(),
      wasSongEdited: false,
    };
  }

  handleSongEdit = (updatedField: string, updatedValue: any) => {
    const { originalSong } = this.props;
    const { editableSong } = this.state;
    editableSong[updatedField] = updatedValue;

    this.setState({
      editableSong,
      wasSongEdited: !originalSong.equals(editableSong),
    });
  }

  handleUploadCover = (e: ChangeEvent<HTMLInputElement>) => {
    // No file selected
    if (!e.target.files || e.target.files.length < 1) return;

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onerror = (e) => { debugger; };
    reader.onload = () => {
      const coverArrayBuffer = reader.result as ArrayBuffer;
      const { editableSong } = this.state;
      const { originalSong } = this.props;

      if (editableSong.albumCover) {
        editableSong.albumCover.setCover(coverArrayBuffer);
      } else {
        editableSong.albumCover = new AlbumCover(file.type, coverArrayBuffer);
      }

      this.setState({
        editableSong,
        wasSongEdited: !originalSong.equals(editableSong),
      });

      this.props.onUploadCover(editableSong.albumCover);
    };
    reader.readAsArrayBuffer(file);
  }

  handleClickSaveChanges = () => {
    this.setState({
      wasSongEdited: false,
    });
    this.props.onSaveChanges(this.state.editableSong);
  }

  handleClickCancel = () => {
    const { editableSong } = this.state;
    const { originalSong } = this.props;
    this.setState({
      editableSong: originalSong.copyTo(editableSong),
      wasSongEdited: false,
    });
    this.props.onCancelChanges();
  }

  render() {
    const { title, artist, album, year } = this.state.editableSong;
    const { wasSongEdited } = this.state;

    return (
      <div className="row mzt-row-details">
        <div className="col">
          {/* TAGS ROW */}
          <div className="row">
            <div className="col">
              {/* Title */}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="mzt-input-title">Title</label>
                    <input id="mzt-input-title" type="text" className="form-control"
                      value={title}
                      onChange={e => this.handleSongEdit('title', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Artist */}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="mzt-input-artist">Artist</label>
                    <input id="mzt-input-artist" type="text" className="form-control"
                      value={artist}
                      onChange={e => this.handleSongEdit('artist', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              {/* Album */}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="mzt-input-album">Album</label>
                    <input id="mzt-input-album" type="text" className="form-control"
                      value={album}
                      onChange={e => this.handleSongEdit('album', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Year */}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label htmlFor="mzt-input-year">Year</label>
                    <input id="mzt-input-year" type="number" className="form-control"
                      value={year}
                      onChange={e => this.handleSongEdit('year', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div> {/* END OF TAGS ROW */}

          {/* [BUTTONS] */}
          <div className="row justify-content-center">

            {/* Save changes */}
            <div className="col-1">
              <div {...(wasSongEdited ? { onClick: this.handleClickSaveChanges } : {})}>
                <Tippy content="Save changes" arrow={true} placement="bottom" delay={400}>
                  <i className={`fas fa-save mzt-btn-actions ${wasSongEdited ? 'success' : 'disabled'}`}></i>
                </Tippy>
              </div>
            </div>

            {/* Upload new album cover */}
            <div className="col-1">
              {/* Hidden */}
              <input id="btn-upload-cover"
                className="mzt-invisible"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => this.handleUploadCover(e)} />

              {/* Visible */}
              <div onClick={handleInputClicked}>
                <Tippy content="Upload new album cover" arrow={true} placement="bottom" delay={400}>
                  <i className="fas fa-file-image mzt-btn-actions"></i>
                </Tippy>
              </div>
            </div>

            {/* Cancel changes */}
            <div className="col-1">
              <div onClick={this.handleClickCancel}>
                <Tippy content="Cancel changes" arrow={true} placement="bottom" delay={400}>
                  <i className={`fas fa-ban mzt-btn-actions ${wasSongEdited ? 'error' : 'disabled'}`}></i>
                </Tippy>
              </div>
            </div>
          </div> {/* END OF [BUTTONS] row*/}
        </div>
      </div>
    );
  }
}

export default TagEditor;
