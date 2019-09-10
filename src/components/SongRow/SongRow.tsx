import React, { Component, ChangeEvent } from 'react';

import Song from '../../models/song';
import SongHelper from '../../helpers/songHelper';

import SongStatus from '../SongStatus/SongStatus';
import SongHeader from '../SongHeader/SongHeader';
import TagEditor from '../TagEditor/TagEditor';

import { SongStatuses } from '../SongStatus/songStatuses';
import './song-row.css';
import AlbumCover from '../../models/albumCover';
import AudioPlayer from '../AudioPlayer/AudioPlayer';

type Props = {
  file: File;
  song: Song;
};

type State = {
  songStatus: SongStatuses;
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
      songStatus: SongStatuses.Original,
      isExpanded: false,
      isBeingCut: false,
      isBeingEdited: false,
      file: props.file,
      originalSong: props.song,
      editableSong: props.song.clone(),
    };
  }

  handleClickEditTags = () => {
    this.setState((prev) => ({ isBeingEdited: !prev.isBeingEdited }));
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
        songStatus: SongStatuses.Saved,
      });
    };
    reader.onerror = (err) => {
      console.log(err);
      debugger;
    };
    reader.readAsArrayBuffer(this.state.file);
  }

  handleClickCutDuration = () => {
    this.setState((prev) => ({
      isBeingCut: !prev.isBeingCut,
    }));
  }

  onSongSave = (newSong: Song) => {
    this.setState({
      originalSong: newSong,
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
        songStatus: originalSong.equals(editableSong) ? SongStatuses.Original : SongStatuses.Modified,
      });
    };
    reader.readAsArrayBuffer(file);
  }

  render() {
    const { file, originalSong, editableSong, songStatus, isBeingCut, isBeingEdited } = this.state;

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
                  handleSaveChanges={this.onSongSave}
                  handleCoverUpload={this.onAlbumCoverUploaded} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SongRow;
