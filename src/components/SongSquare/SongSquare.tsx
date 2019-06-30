import React, { Component } from "react";
// import Song from "../../models/song";
import TagReader from "jsmediatags";
import TagWriter from "browser-id3-writer";
import FileSaver from "file-saver";

type Props = {
    songSelectedEvent: Event
};
type State = {};

class SongSquare extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.parseEvent(props.songSelectedEvent);
    }

    parseEvent(e: Event) {
        // const reader = new FileReader();
        // reader.onload = function (a) {
        //     const arrayBuffer = reader.result;
        //     const writer = new TagWriter(arrayBuffer);
        //     writer.setFrame("TYER", 2000);
        //     writer.addTag();
        //     // FileSaver.saveAs(writer.getBlob(), "modified.mp3");
        // };
        // reader.onprogress = function (e) {
        //     console.log(Math.floor((e.loaded / e.total) * 100));
        // }
        // reader.onerror = function (e) {
        //     debugger;
        //     console.error("Reader error", reader.error);
        // };
        // reader.readAsArrayBuffer(e.target.files[0]);
    }

    render() {
        // const { song } = this.props;
        return (
            // <div>
            //     <h1>Artist: {song.Artist}</h1>
            //     <h2>Artist: {song.Title}</h2>
            //     <h3>Album: {song.Album}</h3>
            //     <h4>Year: {song.Year}</h4>
            // </div>
            <div className='row'>
                <div className='col-4'>
                    Text
                </div>
            </div>
        );
    }
}

export default SongSquare;