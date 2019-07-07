import React, { Component, ChangeEvent } from 'react';
import FileHelper from '../../helpers/fileHelper';
import './file-input.css'

type Props = {
    onFilesSelected: Function
};
type State = {};

class FileInput extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.onFilesSelected = this.onFilesSelected.bind(this);
    }

    onInputClicked(e) {
        const input = document.getElementById("btn-upload-songs");
        if (input)
            input.click();
    }

    async onFilesSelected(e: ChangeEvent<HTMLInputElement>) {
        // No files selected
        if (!e.target.files || e.target.files.length < 1)
            return;

        const selectedFiles = Array.from(e.target.files) as Array<File>;
        const potentialSongs = await FileHelper.convertFilesToSongs(selectedFiles);
        this.props.onFilesSelected(potentialSongs);
    }

    render() {
        return (
            <div className='row justify-content-center mzt-row-upload-songs'>
                <div className='col-2'>

                    {/* Visible */}
                    <div
                        className="btn btn-primary"
                        onClick={this.onInputClicked}>
                        Upload songs
                    </div>

                    {/* Hidden */}
                    <input
                        id="btn-upload-songs"
                        type='file'
                        multiple
                        accept='.mp3'
                        onChange={this.onFilesSelected} />
                </div>

            </div>
        );
    }
}

export default FileInput;