export default class AlbumCover {
    public dataAsBase64: string;
    public dataAsTagSrc: string;
    public dataAsArrayBuffer: ArrayBuffer;

    constructor(
        public format: string, // ex.: "image/png"
        public dataAsBytes: Array<number>,
        public description: string = "",
        public type: string = "" // ex.: "Cover (front)"
    ) {
        this.format = format;
        this.dataAsBytes = dataAsBytes;
        this.description = description;
        this.type = type;

        this.dataAsArrayBuffer = Uint8Array.from(dataAsBytes).buffer;
        this.dataAsBase64 = dataAsBytes.reduce((acc: string, cur: number) => acc + String.fromCharCode(cur), "");
        this.dataAsTagSrc = `data:${this.format};base64,${btoa(this.dataAsBase64)}`;
    }
}