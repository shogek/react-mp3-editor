import TagWriter from 'browser-id3-writer';
import FileSaver from 'file-saver';

import Song from '../models/song';

export default class SongHelper {
  static downloadSong(arrayBuffer: ArrayBuffer, song: Song, fileName: string): void {
    const writer = new TagWriter(arrayBuffer);
    if (song.title) {
      writer.setFrame('TIT2', song.title);
    }

    if (song.artist) {
      writer.setFrame('TPE1', [song.artist]);
    }

    if (song.album) {
      writer.setFrame('TALB', song.album);
    }

    if (song.year) {
      writer.setFrame('TYER', song.year);
    }

    if (song.albumCover) {
      writer.setFrame('APIC', {
        type: 0, // (Other) because my MP3 player only supports this one
        data: song.albumCover.dataAsArrayBuffer,
        description: '',
        useUnicodeEncoding: false,
      });
    }

    writer.addTag();

    FileSaver.saveAs(writer.getBlob(), fileName);
  }
}
