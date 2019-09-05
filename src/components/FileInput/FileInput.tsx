import React, { Component, ChangeEvent } from 'react';
import FileHelper from '../../helpers/fileHelper';

type Props = {
  onFilesSelected: Function,
};
type State = {};

class FileInput extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.onFilesSelected = this.onFilesSelected.bind(this);
  }

  onInputClicked() {
    const input = document.getElementById('btn-upload-songs');
    if (input) {
      input.click();
    }
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
    return (
      <div className="row justify-content-center mb-4">
        <div className="col-2">

          {/* Visible */}
          <div className="btn btn-primary" onClick={this.onInputClicked}>
            Upload songs
          </div>

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
