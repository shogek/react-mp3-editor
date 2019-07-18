// TODO: Show warning when choosing new songs again
// TODO: Album cover disappears on download

import React, { Component, ChangeEvent } from 'react';
import SongRow from '../SongRow/SongRow';
import FileInput from '../FileInput/FileInput';
import ProgressBar from '../ProgressBar/ProgressBar';
import FileSelection from "../../models/fileSelection";
import AlbumCover from '../../models/albumCover';
import DefaultCover from '../SongHeader/cover_350x350.png';

type Props = {};
type State = {
    uploadedFiles: Array<FileSelection>;
    songsToProcess: number;
    songsProcessed: number;
};

class Main extends Component<Props, State> {
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

    onUpload(e: ChangeEvent<HTMLInputElement>) {
        // No file selected
        if (!e.target.files || e.target.files.length < 1)
            return;

        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onerror = (e) => { debugger; };
        reader.onload = (a) => {
            var test = reader.result as ArrayBuffer;
            var cover = new AlbumCover(file.type, test, '', 'Front (Cover)');
            var tag = document.getElementById('test');
            if (tag) {
                tag.setAttribute('src', cover.dataAsTagSrc);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    render() {
        const { uploadedFiles, songsToProcess, songsProcessed } = this.state;
        const isLoading = songsToProcess !== songsProcessed && songsToProcess > 0;

        return (
            <div className='container'>
                {
                    isLoading
                        ? <ProgressBar maxValue={songsToProcess} curValue={songsProcessed} heading={`Songs processed: ${songsProcessed}/${songsToProcess}`} />
                        : <FileInput onFilesSelected={this.handleFilesSelected} />
                }
                <input
                    type='file'
                    accept='.png,.jpg,.jpeg'
                    onChange={this.onUpload} />

                <div className=''>
                    <img
                        id='test'
                        className='img-thumbnail'
                        alt='album cover'
                        src={DefaultCover} />
                </div>

                {/* Song rows */}
                {uploadedFiles.map(u => <SongRow key={u.file.name} file={u.file} song={u.song} handleSongRemove={this.handleSongRemove} />)}
            </div>
        );
    }
}

export default Main;