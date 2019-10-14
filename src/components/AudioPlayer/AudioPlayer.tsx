import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoadingOverlay from 'react-loading-overlay';
import Tippy from '@tippy.js/react';
import Song from '../../models/song';
import waveConfig from './config/waveConfig';
import WaveSurfer from 'wavesurfer.js';
import cursorConfig from './config/cursorConfig';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import './audio-player.css';

type Props = {
  songToPlay: Song;
  blobToPlay: Blob;
  onCut: Function;
};
type State = {
  /** Is the song currently playing. */
  isPlaying: boolean;
  /** * Start time of the region to cut. */
  cutStart: number;
  /** Original start time of the region (used when user presses 'Cancel'). */
  originalCutStart: number;
  /** End time of the region to cut. */
  cutEnd: number;
  /** Original end time of the region (used when user presses 'Cancel'). */
  originalCutEnd: number;
  /** Should the song be cut with a fade in. */
  addFadeIn: boolean;
  /** Should the song be cut with a fade out. */
  addFadeOut: boolean;
  /** Marks whether the regions were moved. */
  wasRegionChanged: boolean;
};

export default class AudioPlayer extends Component<Props, State> {
  private readonly WAVEFORM_CONTAINER: string = 'waveform';
  private readonly REGION_COLOR: string = 'rgba(0, 123, 255, 0.48)';

  /** The main library for displaying the audio wave. */
  private waveSurfer!: WaveSurfer;

  state: State = {
    isPlaying: false,
    originalCutStart: NaN,
    originalCutEnd: NaN,
    cutStart: NaN,
    cutEnd: NaN,
    addFadeIn: false,
    addFadeOut: false,
    wasRegionChanged: false,
  };

  /** Generate and show the audio wave. */
  componentDidMount() {
    const { blobToPlay } = this.props;

    // Get the specific DOM element for storing the wave visualization
    const componentDiv = ReactDOM.findDOMNode(this) as HTMLElement;
    const waveformDiv = componentDiv.getElementsByClassName('waveform')[0] as HTMLElement;

    this.waveSurfer = WaveSurfer.create({
      // Get the specific DOM element for storing the wave visualization
      container: waveformDiv,
      ...waveConfig,
      plugins: [
        // Add a vertical cursor on the wave form when the mouse hovers over it
        CursorPlugin.create({ ...cursorConfig }),
        // Initialize the plugin that adds a dragable region over the waveform
        RegionsPlugin.create(),
      ],
    });
    this.waveSurfer.on('ready', () => this.onWaveSurferReady(this.waveSurfer));
    this.waveSurfer.on('finish', () => this.onSongFinishedPlaying());
    this.waveSurfer.loadBlob(blobToPlay);
  }

  componentWillUnmount = () => {
    this.waveSurfer.destroy();
  }

  /**
   * Start listening to region events.
   * Draw the region itself.
   */
  onWaveSurferReady = (waveSurfer: WaveSurfer) => {
    waveSurfer.on('region-created', this.onCropRegionCreated);
    waveSurfer.on('region-updated', this.onCropRegionUpdated);
    waveSurfer.on('region-update-end', this.onCropRegionUpdateEnd);

    let cutStart: number;
    let cutEnd: number;
    const duration = waveSurfer.getDuration();

    if (duration > 40) {
      cutStart = 20;
      cutEnd = duration - 20;
    } else {
      cutStart = 0;
      cutEnd = duration;
    }

    waveSurfer.addRegion({
      start: cutStart,
      end: cutEnd,
      color: this.REGION_COLOR,
    });

    this.setState({
      cutStart,
      cutEnd,
      originalCutStart: cutStart,
      originalCutEnd: cutEnd,
    });
  }

  onCropRegionCreated = (params: any) => {
    // Remove region's 'title' attribute showing the region's duration.
    params.element.attributes.title.value = '';
  }

  /**
   * Called when the draggable area has been moved.
   * Recreate region if starting end overlaps the ending.
   */
  onCropRegionUpdated = (params: any) => {
    const { start, end } = params;
    const {
      cutStart,
      cutEnd,
      isPlaying,
    } = this.state;

    // Remove region's 'title' attribute showing the region's duration.
    params.element.attributes.title.value = '';

    // Check if one end of the region was dragged over the other one
    if (Math.abs(start - end) > 0.25) {
      return;
    }

    // Recreate region from last know valid positions
    const newRegion = this.recreateRegion(this.waveSurfer, cutStart, cutEnd);

    if (isPlaying) {
      newRegion.play();
    }
  }

  /** Called when the region has finished moving (drag/expand/shrink). */
  onCropRegionUpdateEnd = (params: any) => {
    const regionStart = params.start;
    const regionEnd = params.end;
    const {
      isPlaying,
      cutStart,
    } = this.state;

    if (isPlaying) {
      regionStart !== cutStart
        ? this.waveSurfer.play(regionStart)
        : this.waveSurfer.play(regionEnd);
    }

    this.setState({
      cutStart: regionStart,
      cutEnd: regionEnd,
      wasRegionChanged: true,
    });
  }

  /**
   * Recreate the region to given time stamps.
   * @returns The newly created region.
   */
  recreateRegion = (waveSurfer: WaveSurfer, startTime: number, endTime: number) : WaveSurfer => {
    waveSurfer.clearRegions();

    return waveSurfer.addRegion({
      start: startTime,
      end: endTime,
      color: this.REGION_COLOR,
    });
  }

  onSongFinishedPlaying = () => {
    this.setState({
      isPlaying: false,
    });
  }

  /** Play or pause the audio playback. */
  handleClickTogglePlay = () => {
    const {
      isPlaying,
    } = this.state;

    isPlaying
      ? this.waveSurfer.pause()
      : this.waveSurfer.play();

    this.setState({ isPlaying: !isPlaying });
  }

  handleClickCut = () => {
    const {
      isPlaying,
      cutStart,
      cutEnd,
      addFadeIn,
      addFadeOut,
    } = this.state;

    if (isPlaying) {
      this.waveSurfer.stop();
      this.setState({
        isPlaying: false,
      });
    }

    this.props.onCut(cutStart, cutEnd, addFadeIn, addFadeOut);
  }

  toggleFadeIn = () => {
    this.setState((prev: State) => ({
      addFadeIn: !prev.addFadeIn,
    }));
  }

  toggleFadeOut = () => {
    this.setState((prev: State) => ({
      addFadeOut: !prev.addFadeOut,
    }));
  }

  render() {
    const {
      isPlaying,
      wasRegionChanged,
      addFadeIn,
      addFadeOut,
    } = this.state;
    const isLoading = this.waveSurfer ? false : true;
    const toggleIcon = `fas fa-${isPlaying ? 'pause' : 'play'} mzt-btn-actions`;
    const tooltip = isPlaying ? 'Pause' : 'Play';

    return (
      <LoadingOverlay
        className="loading-spinner"
        active={isLoading}
        text="Generating audio wave.."
        spinner={true}
        fadeSpeed={200}
      >
        <div className={`row mzt-row-waveform ${isLoading ? 'mzt-hidden' : ''}`}>
          <div className="col">
            {/* The waveform */}
            <div className="row">
              <div className="col">
                <div className={this.WAVEFORM_CONTAINER}/>
              </div>
            </div>

            {/* [BUTTONS] */}
            <div className="row justify-content-center">

              {/* COLUMN 1 */}
              <div className="col-3">
                <div className="row">

                  {/* Play/pause the song */}
                  <div className="col">
                    <Tippy content={tooltip} arrow={true} placement="bottom" delay={400} >
                      <i className={toggleIcon} onClick={() => this.handleClickTogglePlay()} />
                    </Tippy>
                  </div>

                  {/* Toggle fade in */}
                  <div className="col" >
                    <Tippy content="Toggle 3 second fade in" arrow={true} placement="bottom" delay={400} >
                      <i className={`fas fa-signal mzt-btn-actions ${addFadeIn ? 'active' : ''}`}
                        onClick={this.toggleFadeIn} />
                    </Tippy>
                  </div>

                  {/* Toggle fade out */}
                  <div className="col" >
                    <Tippy content="Toggle 3 second fade out" arrow={true} placement="bottom" delay={400} >
                      <i className={`fas fa-signal mzt-btn-actions mirrored ${addFadeOut ? 'active' : ''}`}
                        onClick={this.toggleFadeOut} />
                    </Tippy>
                  </div>
                </div>
              </div> {/* END OF COLUMN 1 */}

              {/* COLUMN 2 */}
              <div className="col-4">
                <div className="row">

                  {/* Cut the song */}
                  <div className="col" >
                    <Tippy content="Cut the song to selected region" arrow={true} placement="bottom" delay={400} >
                      <i className={`fas fa-cut mzt-btn-actions ${wasRegionChanged ? 'success' : 'disabled'}`}
                        {...(wasRegionChanged ? { onClick: this.handleClickCut } : {})} />
                    </Tippy>
                  </div>

                </div>
              </div> {/* END OF COLUMN 2 */}

            </div> {/* END OF [BUTTONS] ROW */}

          </div>
        </div>
      </LoadingOverlay>
    );
  }
}
