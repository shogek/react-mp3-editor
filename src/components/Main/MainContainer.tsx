// TODO: Show warning when choosing new songs again
// TODO: Album cover disappears on download
// TODO: Fix loader not updating fast enough

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

        for (let potentialSong of potentialSongs) {
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
        }
    }

    render() {
        const { uploadedFiles, songsToProcess, songsProcessed } = this.state;
        const songSquares = uploadedFiles.length < 1
            ? null
            : uploadedFiles.map(upload => <SongSquare key={upload.file.name} file={upload.file} song={upload.song} handleSongRemove={this.handleSongRemove} />);

        return (
            <div className='container'>
                <FileInput onFilesSelected={this.handleFilesSelected} />
                {
                    songsToProcess !== songsProcessed
                        ? <ProgressBar maxValue={songsToProcess} curValue={songsProcessed} heading={`Songs processed: ${songsProcessed}/${songsToProcess}`} />
                        : null
                }
                {songSquares}
            </div>
        );
    }
}

export default MainContainer;