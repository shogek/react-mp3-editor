import TagWriter from 'browser-id3-writer';
import FileSaver from 'file-saver';

import Song from '../models/song';
import AlbumCover from '../models/albumCover';

export default class SongHelper {
    static downloadSong(arrayBuffer: ArrayBuffer, song: Song, fileName: string): void {
        const writer = new TagWriter(arrayBuffer);
        writer.setFrame('TIT2', song.title);
        writer.setFrame('TPE1', [song.artist]);
        writer.setFrame('TALB', song.album);
        writer.setFrame('TYER', song.year);
        if (song.albumCover) {
            writer.setFrame('APIC', {
                type: 3, // Cover (front)
                data: song.albumCover.dataAsArrayBuffer,
                description: song.albumCover.description,
                useUnicodeEncoding: false
            });
        }

        writer.addTag();

        FileSaver.saveAs(writer.getBlob(), fileName);
    }

    static areSongsDifferent(source: Song, target: Song): boolean {
        if (source.title !== target.title) return true;
        if (source.artist !== target.artist) return true;
        if (source.album !== target.album) return true;
        if (source.year !== target.year) return true;
        return false;
    }

    static getCopyOfSong(song: Song): Song {
        const cover = song.albumCover;
        const coverCopy = !cover ? undefined : new AlbumCover(cover.format, cover.dataAsArrayBuffer, cover.description, cover.type);

        const songCopy = new Song(song.artist, song.title, song.album, song.year, coverCopy);
        return songCopy;
    }
}