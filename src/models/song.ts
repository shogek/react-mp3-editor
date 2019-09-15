import AlbumCover from './albumCover';

/**
 * Represents an uploaded song along with its information.
 */
export default class Song {
  constructor(
    public artist: string = '',
    public title: string = '',
    public album: string = '',
    public year: string = '',
    public albumCover?: AlbumCover,
    ) { }

  /**
   * Checks object equality between the current song and the passed in.
   * @param other song to compare to
   * @returns true if songs are equal, else - false
   */
  public equals(other?: Song): boolean {
    if (!other
      || this.artist !== other.artist
      || this.title !== other.title
      || this.album !== other.album
      || this.year !== other.year
      ) {
      return false;
    }

    if (this.albumCover && !this.albumCover.equals(other.albumCover)) {
      return false;
    }

    return true;
  }

  /**
   * Returns a deep copy of the current song object.
   */
  public clone(): Song {
    const cover = this.albumCover;
    const coverClone = cover ? new AlbumCover(cover.format, cover.dataAsArrayBuffer) : undefined;
    return new Song(this.artist, this.title, this.album, this.year, coverClone);
  }

  /**
   * Copies values from the origin song to the 'other' song.
   *
   * @param other Song to which to copy over values.
   * @returns Song with copied over values.
   */
  public copyTo(other: Song): Song {
    other.artist = this.artist;
    other.title = this.title;
    other.album = this.album;
    other.year = this.year;

    if (!this.albumCover) {
      other.albumCover = undefined;
    } else if (other.albumCover) {
      this.albumCover.copyTo(other.albumCover);
    } else {
      const cover = this.albumCover;
      other.albumCover = new AlbumCover(cover.format, cover.dataAsArrayBuffer);
    }

    return other;
  }
}
