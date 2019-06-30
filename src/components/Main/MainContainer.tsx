import React, { Component } from "react";
import UploadSongsButton from "../UploadSongsButton/UploadSongsButtonContainer";
import SongSquare from "../SongSquare/SongSquareContainer";

type Props = {};
type State = {
    files: Array<File>
};

class MainContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            files: []
        };

        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleSongRemove = this.handleSongRemove.bind(this);
    }

    async handleFileSelect(newFiles: Array<File>) {
        // On first upload - simply take songs
        const oldFiles = this.state.files;
        if (oldFiles.length < 1)
            return this.setState({ files: newFiles });

        // On second upload - merge avoiding duplicates
        for (let newFile of newFiles) {
            let alreadyIncluded = false;

            for (let oldFile of oldFiles)
                if (oldFile.name === newFile.name)
                    alreadyIncluded = true;

            if (!alreadyIncluded)
                oldFiles.push(newFile);
        }

        this.setState({ files: oldFiles });
    }

    handleSongRemove(fileName: string) {
        this.setState({
            files: this.state.files.filter(f => f.name !== fileName)
        });
    }

    render() {
        const { files } = this.state;
        const songSquares = files.length < 1
            ? null
            : files.map(file => <SongSquare key={file.name} file={file} handleSongRemove={this.handleSongRemove} />);

        return (
            <div className='container'>
                <UploadSongsButton onUpload={this.handleFileSelect} />
                {songSquares}
            </div>
        );
    }
}

export default MainContainer;