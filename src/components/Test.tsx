import React, { Component } from "react";
import TagReader from "jsmediatags";
import TagWriter from "browser-id3-writer";
import FileSaver from "file-saver";
import Song from "./song";
import SongSquare from "./SongSquare";

type Props = {};
type State = {
    wasSongSelected: boolean,
    songSelected: any,
    song: Song
};

class Test extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            wasSongSelected: false,
            songSelected: null,
            song: new Song()
        };

        this.onFileUploaded = this.onFileUploaded.bind(this);
        this.onFileTagsCreateSuccess = this.onFileTagsCreateSuccess.bind(this);
        this.onFileTagsCreateError = this.onFileTagsCreateError.bind(this);
    }

    onFileUploaded(e: any) {
        debugger;
        const reader = new FileReader();
        reader.onload = function (a) {
            debugger;
            const arrayBuffer = reader.result;
            const writer = new TagWriter(arrayBuffer);
            writer.setFrame("TYER", 2000);
            writer.addTag();
            FileSaver.saveAs(writer.getBlob(), "modified.mp3");
        };
        reader.onerror = function (e) {
            debugger;
            console.error("Reader error", reader.error);
        };
        reader.readAsArrayBuffer(e.target.files[0]);

        this.setState({
            songSelected: e.target.files[0]
        });

        TagReader.read(e.target.files[0], {
            onSuccess: this.onFileTagsCreateSuccess,
            onError: this.onFileTagsCreateError
        });
    }

    onFileTagsCreateSuccess(tags) {
        debugger;
        const { artist, title, album, year } = tags.tags;
        const song = new Song(artist, title, album, year);
        debugger;
        const reader = new FileReader();
        reader.onload = () => {
            // const arrayBuffer = this.result;
            // const array = new Uint8Array(arrayBuffer);
            // const binaryString = String.fromCharCode.apply(null, array);
        };
        debugger;
        console.log(song);
        this.setState({
            wasSongSelected: true,
            song: song
        });
    }

    onFileTagsCreateError(error) {
        debugger;

    }

    render() {
        const { song, wasSongSelected } = this.state;
        return (
            <div>
                {
                    wasSongSelected
                        ? <SongSquare song={song} />
                        : <input type="file" onChange={this.onFileUploaded} />
                }
            </div>
        );
    }
}

export default Test;