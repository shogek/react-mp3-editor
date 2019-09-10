import TagReader from 'jsmediatags';

import FileSelection from '../models/fileSelection';
import AlbumCover from '../models/albumCover';
import Song from '../models/song';

export default class FileHelper {
  static convertFilesToSongs(files: Array<File>): Array<Promise<FileSelection>> {
    const promises = new Array<Promise<FileSelection>>();

    files.forEach((file) => {
      promises.push(new Promise<FileSelection>((resolve, reject) => {
        TagReader.read(file, {
          // Successfully read file's tags
          onSuccess: (tags: any) => {
            const { artist, title, album, year, /*genre, trackNo,*/ picture } = tags.tags;

            const cover = picture ? new AlbumCover(picture.format, picture.data) : undefined;
            const song = new Song(artist, title, album, year, cover);
            const fileSelection = new FileSelection(file, song);
            resolve(fileSelection);
          },
          // Failed to read file's tags
          onError: (error: any) => {
            debugger;
            // TODO: Find out what information is store in the 'error' param
            const message = `Failed to load: ${file.name} because ${error}`;
            reject(message);
          },
        });
      }));
    });

    return promises;
  }
}
