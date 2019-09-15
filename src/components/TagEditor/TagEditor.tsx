import React, { Component } from 'react';
import Tippy from '@tippy.js/react';
import Song from '../../models/song';
import './tag-editor.css';

type Props = {
  originalSong: Song;
  onSaveChanges: Function;
  onCoverUpload: Function;
  onCancelChanges: Function;
};
type State = {
  editableSong: Song;
  wasSongEdited: boolean;
};

// TODO: Show unsaved changes on modified fields.
function handleInputClicked() {
  // TODO: set nodeValue to empty string.
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

  handleSongEdited = (updatedField: string, updatedValue: any) => {
    const { originalSong } = this.props;
    const { editableSong } = this.state;
    editableSong[updatedField] = updatedValue;

    this.setState({
      editableSong,
      wasSongEdited: !originalSong.equals(editableSong),
    });
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
  }

  render() {
    const { title, artist, album, year } = this.state.editableSong;
    const { wasSongEdited } = this.state;
    const { onCoverUpload } = this.props;

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
                      onChange={e => this.handleSongEdited('title', e.target.value)} />
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
                      onChange={e => this.handleSongEdited('artist', e.target.value)} />
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
                      onChange={e => this.handleSongEdited('album', e.target.value)} />
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
                      onChange={e => this.handleSongEdited('year', e.target.value)} />
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
                onChange={e => onCoverUpload(e)} />

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
