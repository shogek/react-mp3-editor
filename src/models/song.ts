import AlbumCover from "./albumCover";

export default class Song {
    constructor(
        public artist?: string,
        public title?: string,
        public album?: string,
        public year?: number,
        public albumCover?: AlbumCover
    ) { }
}