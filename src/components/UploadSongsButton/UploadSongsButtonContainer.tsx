import React, { Component } from "react";
import "./upload-songs-button.css";
import UploadSongsButton from './UploadSongsButton';

type Props = {
    onUpload: Function
};
type State = {};

class UploadSongsButtonContainer extends Component<Props, State> {
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
        return <UploadSongsButton handleClick={this.handleClick} handleFileSelect={this.handleFileSelect} />
    }
}

export default UploadSongsButtonContainer;