import React, { Component } from 'react';
import Tippy from '@tippy.js/react';
import Song from '../../models/song';
import './tag-editor.css';

type Props = {
  originalSong: Song;
  handleSaveChanges: Function;
  handleCoverUpload: Function;
};
type State = {
  editableSong: Song;
};

function onInputClicked() {
  const input = document.getElementById('btn-upload-cover');
  if (input) {
    input.click();
  }
}

class TagEditor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editableSong: this.props.originalSong.clone(),
    };
  }

  onSongEdited = (updatedField: string, updatedValue: any) => {
    const { editableSong } = this.state;
    editableSong[updatedField] = updatedValue;
    this.setState({
      editableSong,
    });
  }

  onClickSaveChanges = () => {
    this.props.handleSaveChanges(this.state.editableSong);
  }

  onClickCancel = () => {
    this.setState({
      editableSong: this.props.originalSong,
    });
  }

  render() {
    const { title, artist, album, year } = this.state.editableSong;
    const { handleCoverUpload } = this.props;

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
                      onChange={(e) => this.onSongEdited('title', e.target.value)} />
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
                      onChange={(e) => this.onSongEdited('artist', e.target.value)} />
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
                      onChange={(e) => this.onSongEdited('album', e.target.value)} />
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
                      onChange={(e) => this.onSongEdited('year', e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div> {/* END OF TAGS ROW */}

          {/* [BUTTONS] */}
          <div className="row justify-content-center">
            {/* Upload new album cover */}
            <div className="col-1">
              {/* Hidden */}
              <input id="btn-upload-cover"
                className="mzt-invisible"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => handleCoverUpload(e)} />

                {/* Visible */}
                <div onClick={onInputClicked}>
                  <Tippy content="Upload new album cover" arrow={true} placement="bottom" delay={400}>
                    <i className="fas fa-file-image mzt-btn-actions"></i>
                  </Tippy>
                </div>
              </div>

            {/* Save changes */}
            <div className="col-1">
              <div onClick={this.onClickSaveChanges}>
                <Tippy content="Save changes" arrow={true} placement="bottom" delay={400}>
                  <i className="fas fa-save mzt-btn-actions"></i>
                </Tippy>
              </div>
            </div>

            {/* Cancel changes */}
            <div className="col-1">
              <div onClick={this.onClickCancel}>
                <Tippy content="Cancel changes" arrow={true} placement="bottom" delay={400}>
                  <i className="fas fa-ban mzt-btn-actions"></i>
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
