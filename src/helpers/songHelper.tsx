import TagWriter from 'browser-id3-writer';
import FileSaver from 'file-saver';

import Song from '../models/song';

export default class SongHelper {
    static downloadSong(arrayBuffer: ArrayBuffer, song: Song, fileName: string): void {
        const writer = new TagWriter(arrayBuffer);
        writer.setFrame('TIT2', song.title);
        writer.setFrame('TPE1', [song.artist]);
        writer.setFrame('TALB', song.album);
        writer.setFrame('TYER', song.year);
        writer.addTag();

        FileSaver.saveAs(writer.getBlob(), fileName);
    }
}