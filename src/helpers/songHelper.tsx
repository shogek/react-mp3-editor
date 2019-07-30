import TagWriter from 'browser-id3-writer';
import FileSaver from 'file-saver';

import Song from '../models/song';

export default class SongHelper {
    static downloadSong(arrayBuffer: ArrayBuffer, song: Song, fileName: string): void {
        const writer = new TagWriter(arrayBuffer);
        if (song.title)
            writer.setFrame('TIT2', song.title);

        if (song.artist)
            writer.setFrame('TPE1', [song.artist]);

        if (song.album)
            writer.setFrame('TALB', song.album);

        if (song.year)
            writer.setFrame('TYER', song.year);

        if (song.albumCover) {
            writer.setFrame('APIC', {
                type: 3, // Cover (front)
                data: song.albumCover.dataAsArrayBuffer,
                description: 'Album cover',
                useUnicodeEncoding: false
            });
        }

        writer.addTag();

        FileSaver.saveAs(writer.getBlob(), fileName);
    }
}