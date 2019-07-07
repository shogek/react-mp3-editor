// TODO: Show warning when choosing new songs again
// TODO: Album cover disappears on download

import React, { Component } from "react";
import SongSquare from "../SongSquare/SongSquareContainer";
import FileInput from '../FileInput/FileInput';
import ProgressBar from "../ProgressBar/ProgressBar";
import FileSelection from "../../models/fileSelection";

type Props = {};
type State = {
    uploadedFiles: Array<FileSelection>;
    songsToProcess: number;
    songsProcessed: number;
};

class MainContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            uploadedFiles: [],
            songsToProcess: 0,
            songsProcessed: 0
        };

        this.handleSongRemove = this.handleSongRemove.bind(this);
        this.handleFilesSelected = this.handleFilesSelected.bind(this);
    }

    handleSongRemove(fileName: string) {
        this.setState({
            uploadedFiles: this.state.uploadedFiles.filter(f => f.file.name !== fileName)
        });
    }

    handleFilesSelected(potentialSongs: Array<Promise<FileSelection>>) {
        this.setState({
            uploadedFiles: [],
            songsProcessed: 0,
            songsToProcess: potentialSongs.length
        });

        // TODO: Fix this
        // The timeout allows the progress bar to keep up but it slows down the tag reading drastically.
        let timeout = 0;
        for (let potentialSong of potentialSongs) {
            setTimeout(() => {
                potentialSong.then(
                    (result: FileSelection) => {
                        this.setState(prev => ({
                            uploadedFiles: [...prev.uploadedFiles, result],
                            songsProcessed: prev.songsProcessed + 1
                        }));
                    },
                    (error: string) => {
                        console.log(error);
                        debugger;
                        this.setState(prev => ({
                            songsProcessed: prev.songsProcessed + 1
                        }));
                    }
                );
            }, timeout);
            timeout += 100;
        }
    }

    render() {
        const { uploadedFiles, songsToProcess, songsProcessed } = this.state;
        const isLoading = songsToProcess !== songsProcessed && songsToProcess > 0;
        const songSquares = uploadedFiles.length < 1
            ? null
            : uploadedFiles.map(upload => <SongSquare key={upload.file.name} file={upload.file} song={upload.song} handleSongRemove={this.handleSongRemove} />);

        return (
            <div className='container'>
                {
                    isLoading
                        ? <ProgressBar maxValue={songsToProcess} curValue={songsProcessed} heading={`Songs processed: ${songsProcessed}/${songsToProcess}`} />
                        : <FileInput onFilesSelected={this.handleFilesSelected} />
                }
                {songSquares}
            </div>
        );
    }
}

export default MainContainer;