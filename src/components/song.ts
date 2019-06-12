export default class Song {
    Artist?: string;
    Title?: string;
    Album?: string;
    Year?: number;

    constructor(artist: string = "",
        title: string = "",
        album: string = "",
        year: number = NaN
    ) {
        this.Artist = artist;
        this.Title = title;
        this.Album = album;
        this.Year = year;
    }
}