import React, { Component, ChangeEvent } from 'react';
import FileHelper from '../../helpers/fileHelper';
import './file-input.css';

type Props = {
  onFilesSelected: Function,
};
type State = {
  isProcessing: boolean,
};

class FileInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isProcessing: false,
    };

    this.onFilesSelected = this.onFilesSelected.bind(this);
    this.onLoadDummySongs = this.onLoadDummySongs.bind(this);
  }

  async onInputClicked() {
    const input = document.getElementById('btn-upload-songs');
    if (input) {
      input.click();
    }
  }

  /**
   * IGNORE THE CODING CONVENTIONS USED IN THIS NEW FUNCTION.
   * THE PROJECT IS NO LONGER MAINTAINED AND I ONLY WANTED TO
   * ADD THE "LOAD DUMMY SONGS" OPTION.
   * i can write good code pls i promis
   */
  async onLoadDummySongs() {
    const song1 = require('../../songs/song1.mp3');
    const song2 = require('../../songs/song2.mp3');
    const song3 = require('../../songs/song3.mp3');
    
    const dummySongs: File[] = [];

    fetch(song1)
      .then(response => response.blob())
      .then(async blob => {
        const file = new File([blob], "song1.mp3");
        dummySongs.push(file);
        if (dummySongs.length === 3) {
          const potentialSongs = await FileHelper.convertFilesToSongs(dummySongs);
          this.props.onFilesSelected(potentialSongs);
        }
      }
    );

    fetch(song2)
      .then(response => response.blob())
      .then(async blob => {
        const file = new File([blob], "song2.mp3");
        dummySongs.push(file);
        if (dummySongs.length === 3) {
          const potentialSongs = await FileHelper.convertFilesToSongs(dummySongs);
          this.props.onFilesSelected(potentialSongs);
        }
      }
    );

    fetch(song3)
      .then(response => response.blob())
      .then(async blob => {
        const file = new File([blob], "song3.mp3");
        dummySongs.push(file);
        if (dummySongs.length === 3) {
          const potentialSongs = await FileHelper.convertFilesToSongs(dummySongs);
          this.props.onFilesSelected(potentialSongs);
        }
      }
    );

    this.setState({isProcessing: true});
  }

  async onFilesSelected(e: ChangeEvent<HTMLInputElement>) {
    // No files selected
    if (!e.target.files || e.target.files.length < 1) {
      return;
    }

    const selectedFiles = Array.from(e.target.files) as Array<File>;
    const potentialSongs = await FileHelper.convertFilesToSongs(selectedFiles);
    this.props.onFilesSelected(potentialSongs);

    // Reset the input value so the user could upload the same files a second time
    const input = document.getElementById('btn-upload-songs');
    if (input) {
      input.nodeValue = '';
    }
  }

  render() {
    const loadingMessage = !this.state.isProcessing
      ? null
      : (
        <div className="row">
          <div className="col d-flex justify-content-end">
            Loading dummy songs
          </div>
        </div>
      );

    return (
      <div className="row justify-content-center mb-4">
        <div className="col-4">

          {/* Visible */}
          <div className="song-buttons">
            <div className="btn btn-primary" onClick={this.onInputClicked}>
              Upload songs
            </div>

            <span>or</span>

            <div className="btn btn-primary" onClick={this.onLoadDummySongs}>
              Load dummy songs
            </div>
          </div>

          {loadingMessage}
          
          {/* Hidden */}
          <input id="btn-upload-songs"
            className="mzt-invisible"
            type="file"
            multiple
            accept=".mp3"
            onChange={this.onFilesSelected}
          />
        </div>
      </div>
    );
  }
}

export default FileInput;
