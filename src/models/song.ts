import AlbumCover from "./albumCover";

export default class Song {
    constructor(
        public artist: string = "<NO ARTIST>",
        public title: string = "<NO TITLE>",
        public album: string = "<NO ALBUM>",
        public year: number = -1,
        public albumCover?: AlbumCover
    ) { }
}