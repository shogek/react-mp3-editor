import React, { Component, ChangeEvent } from 'react';
import Song from '../../models/song';
import SongHelper from '../../helpers/songHelper';
import SongHeader from '../SongHeader/SongHeader';
import TagEditor from '../TagEditor/TagEditor';
import AlbumCover from '../../models/albumCover';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './song-row.css';

type Props = {
  file: File;
  song: Song;
};

type State = {
  isExpanded: boolean;
  isBeingCut: boolean;
  isBeingEdited: boolean;
  file: File;
  originalSong: Song;
  editableSong: Song;
};

class SongRow extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isExpanded: false,
      isBeingCut: false,
      isBeingEdited: false,
      file: props.file,
      originalSong: props.song,
      editableSong: props.song.clone(),
    };
  }

  handleClickEditTags = () => {
    this.setState((prev: State) => ({
      isBeingEdited: !prev.isBeingEdited,
    }));
  }

  handleClickDownloadSong = () => {
    const { file, editableSong } = this.state;

    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      SongHelper.downloadSong(arrayBuffer, editableSong, file.name);
      this.setState({
        editableSong,
        originalSong: editableSong.clone(),
      });
    };
    reader.onerror = (err) => {
      console.log(err);
      debugger;
    };
    reader.readAsArrayBuffer(this.state.file);
  }

  handleClickCutDuration = () => {
    this.setState((prev: State) => ({
      isBeingCut: !prev.isBeingCut,
    }));
  }

  onSongSave = (newSong: Song) => {
    this.setState({
      originalSong: newSong,
    });
  }

  handleClickCancelChanges = () => {
    const {
      originalSong,
      editableSong,
    } = this.state;

    this.setState({
      editableSong: originalSong.copyTo(editableSong),
    });
  }

  onAlbumCoverUploaded = (e: ChangeEvent<HTMLInputElement>) => {
    // No file selected
    if (!e.target.files || e.target.files.length < 1) {
      return;
    }

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onerror = (e) => { debugger; };
    reader.onload = () => {
      const coverArrayBuffer = reader.result as ArrayBuffer;
      const { originalSong, editableSong } = this.state;

      if (editableSong.albumCover) {
        editableSong.albumCover.setCover(coverArrayBuffer);
      } else {
        editableSong.albumCover = new AlbumCover(file.type, coverArrayBuffer);
      }

      this.setState({
        editableSong,
      });
    };
    reader.readAsArrayBuffer(file);
  }

  render() {
    const {
      file,
      originalSong,
      editableSong,
      isBeingCut,
      isBeingEdited,
    } = this.state;

    return (
      <div className="row align-items-center">

        <div className="col-12">
          <div className="row mzt-row-song">
            <div className="col">
              <SongHeader
                file={file}
                song={originalSong}
                editableSong={editableSong}
                onClickCut={this.handleClickCutDuration}
                onClickEdit={this.handleClickEditTags}
                onClickDownload={this.handleClickDownloadSong}
                isCuttingEnabled={isBeingCut}
                isEditingEnabled={isBeingEdited}
              />

              {isBeingCut &&
                <AudioPlayer
                  fileToPlay={file}
                  songToPlay={originalSong} />
              }

              {isBeingEdited &&
                <TagEditor
                  originalSong={editableSong}
                  onSaveChanges={this.onSongSave}
                  onCoverUpload={this.onAlbumCoverUploaded}
                  onCancelChanges={this.handleClickCancelChanges}
                />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SongRow;
