import React, { Component } from "react";
import Song from "./song";

type Props = {
    song: Song
};
type State = {};

class SongSquare extends Component<Props, State> {
    render() {
        const { song } = this.props;
        return (
            <div>
                <h1>Artist: {song.Artist}</h1>
                <h2>Artist: {song.Title}</h2>
                <h3>Album: {song.Album}</h3>
                <h4>Year: {song.Year}</h4>
            </div>
        );
    }
}

export default SongSquare;