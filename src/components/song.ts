export default class Song {
    Artist: string;
    Title: string;
    Album: string;
    Year: number;

    constructor(artist: string = "<NO ARTIST>",
        title: string = "<NO TITLE>",
        album: string = "<NO ALBUM>",
        year: number = -1
    ) {
        this.Artist = artist;
        this.Title = title;
        this.Album = album;
        this.Year = year;
    }
}