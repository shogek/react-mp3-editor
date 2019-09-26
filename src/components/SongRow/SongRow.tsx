import React, { Component } from 'react';
import { Encoder, Decoder, BufferManipulations } from 'alamp';
import Song from '../../models/song';
import SongHelper from '../../helpers/songHelper';
import SongHeader from '../SongHeader/SongHeader';
import TagEditor from '../TagEditor/TagEditor';
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import './song-row.css';
import AlbumCover from '../../models/albumCover';

type Props = {
  file: File;
  song: Song;
};

type State = {
  blob?: Blob;
  file: File;
  /** Workaround because 'SongHeader' needs information from 'TagEditor' */
  albumCover?: AlbumCover;
  originalSong: Song;
  editableSong: Song;
  /** Is the song cutter menu is expanded. */
  isCutModeEnabled: boolean;
  /** Is the tag editor menu is expanded. */
  isEditModeEnabled: boolean;
  /** 'true' if the song was cut or tags updated. */
  wereChangesSaved: boolean;
  /** Is the song currently being processed. */
  isBeingCut: boolean;
};

class SongRow extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isBeingCut: false,
      blob: undefined,
      file: props.file,
      isCutModeEnabled: false,
      isEditModeEnabled: false,
      wereChangesSaved: false,
      albumCover: props.song.albumCover,
      originalSong: props.song,
      editableSong: props.song.clone(),
    };
  }

  handleToggleEditMode = () => {
    this.setState((prev: State) => ({
      isEditModeEnabled: !prev.isEditModeEnabled,
    }));
  }

  handleClickDownloadSong = async () => {
    const {
      blob,
      file,
      editableSong,
      originalSong,
    } = this.state;

    if (blob) {
      const arrayBuffer = await new Response(blob).arrayBuffer();
      SongHelper.downloadSong(arrayBuffer, editableSong, file.name);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      SongHelper.downloadSong(arrayBuffer, editableSong, file.name);
      this.setState({
        editableSong,
        originalSong: editableSong.copyTo(originalSong),
      });
    };
    reader.onerror = (err) => {
      console.log(err);
      debugger;
    };
    reader.readAsArrayBuffer(this.state.file);
  }

  handleToggleCutMode = () => {
    this.setState((prev: State) => ({
      isCutModeEnabled: !prev.isCutModeEnabled,
    }));
  }

  onSongSave = (newSong: Song) => {
    const { editableSong } = this.state;
    this.setState({
      editableSong: newSong.copyTo(editableSong),
      wereChangesSaved: true,
    });
  }

  handleClickCancelChanges = () => {
    const {
      originalSong,
      editableSong,
    } = this.state;

    this.setState({
      editableSong: originalSong.copyTo(editableSong),
      albumCover: originalSong.albumCover,
    });
  }

  handleCutSong = async (cutStart: number, cutEnd: number) => {
    const {
      file,
    } = this.state;

    this.setState({
      isBeingCut: true,
    });
    const decoder = new Decoder();
    const buffer = await decoder.decodeFile(file);
    const manipulator = await new BufferManipulations(buffer);
    manipulator.cut(cutStart * 1000, cutEnd * 1000);
    const processedBuffer = await manipulator.apply();

    const encoder = new Encoder();
    const blob = await encoder.encodeToMP3Blob(processedBuffer, 192);
    this.setState({
      blob,
      isBeingCut: false,
    });
  }

  /**
   * @param song Editable song with the new album cover.
   */
  onAlbumCoverUploaded = (newCover: AlbumCover) => {
    this.setState({
      albumCover: newCover,
    });
  }

  render() {
    const {
      blob,
      file,
      albumCover,
      originalSong,
      editableSong,
      isCutModeEnabled,
      isEditModeEnabled,
      isBeingCut,
      wereChangesSaved,
    } = this.state;

    return (
      <div className="row align-items-center">

        <div className="col-12">
          <div className="row mzt-row-song">
            <div className="col">
              <SongHeader
                file={file}
                song={originalSong}
                albumCover={albumCover}
                editableSong={editableSong}
                onToggleCutMode={this.handleToggleCutMode}
                onToggleEditMode={this.handleToggleEditMode}
                onClickDownload={this.handleClickDownloadSong}
                isCuttingEnabled={isCutModeEnabled}
                isEditingEnabled={isEditModeEnabled}
                isDownloadEnabled={wereChangesSaved}
              />

              {isCutModeEnabled && !isBeingCut &&
                <AudioPlayer
                  blobToPlay={blob || file}
                  songToPlay={originalSong}
                  onCut={this.handleCutSong}
                />
              }

              {isEditModeEnabled &&
                <TagEditor
                  originalSong={editableSong}
                  onSaveChanges={this.onSongSave}
                  onUploadCover={this.onAlbumCoverUploaded}
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
