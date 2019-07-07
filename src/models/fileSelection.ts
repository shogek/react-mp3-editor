import Song from './song';

class FileSelection {
    constructor(
        public file: File,
        public song: Song
    ) { }
}

export default FileSelection;