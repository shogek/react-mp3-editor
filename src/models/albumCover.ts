export default class AlbumCover {
    public format: string;
    public description: string;
    public type: string;

    public dataAsBase64: string;
    public dataAsTagSrc: string;
    public dataAsArrayBuffer: ArrayBuffer;

    constructor(
        format: string, // ex.: "image/png"
        dataAsBytes: Array<number> | ArrayBuffer,
        description: string = '',
        type: string = "" // ex.: "Cover (front)"
    ) {
        this.format = format;
        this.description = description;
        this.type = type;

        if (dataAsBytes instanceof ArrayBuffer)
            this.dataAsArrayBuffer = dataAsBytes as ArrayBuffer;
        else
            this.dataAsArrayBuffer = Uint8Array.from(dataAsBytes as Array<number>).buffer;

        this.dataAsBase64 = this._arrayBufferToBase64(dataAsBytes);
        this.dataAsTagSrc = `data:${this.format};base64,${btoa(this.dataAsBase64)}`;
    }

    private _arrayBufferToBase64(buffer): string {
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;

        let binary = '';
        for (let i = 0; i < len; i++)
            binary += String.fromCharCode(bytes[i]);

        return binary;
    };
}