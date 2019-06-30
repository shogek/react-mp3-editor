import React, { Component } from "react";
import "./upload-songs-button.css";

type Props = {
    onUpload: Function
};
type State = {};

class UploadSongsButton extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    handleFileSelect(e) {
        // No files selected
        if (e.target.files.length < 1)
            return;

        const songs = Array.from(e.target.files);
        this.props.onUpload(songs);
    }

    handleClick() {
        const input = document.getElementById("btn-upload-songs");
        if (input)
            input.click();
    }

    render() {
        return (
            <div className='row justify-content-center mzt-row-upload-songs'>
                <div className='col-2'>

                    {/* Visible */}
                    <div
                        className="btn btn-primary"
                        onClick={this.handleClick}
                    >
                        Upload songs
                    </div>

                    {/* Not visible */}
                    <input
                        id="btn-upload-songs"
                        type='file'
                        multiple
                        accept='.mp3'
                        onChange={this.handleFileSelect} />
                </div>
            </div>
        );
    }
}

export default UploadSongsButton;