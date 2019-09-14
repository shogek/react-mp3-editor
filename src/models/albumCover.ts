export default class AlbumCover {
  public format: string;

  public dataAsBase64: string;
  public dataAsTagSrc: string;
  public dataAsArrayBuffer: ArrayBuffer;

  /**
   * @param format ex.: 'image/png'
   * @param dataAsBytes bytes of the image file
   */
  constructor(
    format: string,
    dataAsBytes: Array<number> | ArrayBuffer,
    ) {
    this.format = format;

    this.dataAsArrayBuffer = dataAsBytes instanceof ArrayBuffer
      ? dataAsBytes
      : Uint8Array.from(dataAsBytes as Array<number>).buffer;

    this.dataAsBase64 = this._arrayBufferAsBase64(this.dataAsArrayBuffer);
    this.dataAsTagSrc = this._getTagSrc(this.format, this.dataAsBase64);
  }

  private _getTagSrc(fileFormat: string, dataAsBase64: string) {
    return `data:${fileFormat};base64,${btoa(dataAsBase64)}`;
  }

  private _arrayBufferAsBase64(buffer): string {
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    let binary = '';
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return binary;
  }

  /**
   * Sets a new image as the cover.
   * @param data new image to set
   */
  public setCover(data: ArrayBuffer) {
    this.dataAsArrayBuffer = data;
    this.dataAsBase64 = this._arrayBufferAsBase64(this.dataAsArrayBuffer);
    this.dataAsTagSrc = this._getTagSrc(this.format, this.dataAsBase64);
  }

  /**
   * Checks object equality between the current album cover and the passed in.
   * @param other album cover to compare to
   * @returns true if album covers are equal, else - false
   */
  public equals(other?: AlbumCover): boolean {
    if (!other || this.dataAsTagSrc !== other.dataAsTagSrc) {
      return false;
    }

    return true;
  }

  /**
   * Copies values from the origin AlbumCover to the 'other' albumCover.
   *
   * @param other AlbumCover to which to copy over values.
   * @returns AlbumCover with copied over values.
   */
  public copyTo(other: AlbumCover) : AlbumCover {
    other.format = this.format;
    other.dataAsBase64 = this.dataAsBase64;
    other.dataAsTagSrc = this.dataAsTagSrc;
    other.dataAsArrayBuffer = this.dataAsArrayBuffer;
    return other;
  }
}
