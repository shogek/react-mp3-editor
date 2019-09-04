import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoadingOverlay from 'react-loading-overlay';
import Tippy from '@tippy.js/react';
import Song from '../../models/song';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import './audio-player.css';

type Props = {
    songToPlay: Song;
    fileToPlay: File;
};
type State = {
    isPlaying: boolean;
    cutStart: number;
    cutEnd: number;
    waveSurfer?: WaveSurfer;
};

class AudioPlayer extends Component<Props, State> {
    /**
     * Used when recreating a region in case of error.
     */
    private readonly REGION_COLOR = 'rgba(0, 123, 255, 0.48)';

    constructor(props: Props) {
        super(props);

        this.state = {
            isPlaying: false,
            cutStart: 0,
            cutEnd: 1,
        };
    }

    /**
     * Generate and show the audio wave.
     */
    componentDidMount() {
        const { fileToPlay } = this.props;

        // Get the specific DOM element for storing the wave visualization
        const componentDiv = ReactDOM.findDOMNode(this) as HTMLElement;
        const waveformDiv = componentDiv.getElementsByClassName('waveform')[0] as HTMLElement;

        const waveSurfer = WaveSurfer.create({
            container: waveformDiv,
            backend: 'WebAudio',
            cursorWidth: 2,
            cursorColor: '#232526',
            waveColor: '#525353',
            progressColor: '#232526',
            skipLength: 5,
            plugins: [
                // Add a vertical cursor on the wave form when the mouse hovers over it
                CursorPlugin.create({
                    customStyle: {
                        // the cursor doesn't center to the mouse so we shift it
                        'margin-left': '13.5px'
                    },
                    color: '#007bff',
                    // hide cursor when mouse leaves the wave
                    hideOnBlur: true,
                    width: '2px',
                    showTime: true,
                    opacity: '1',
                    customShowTimeStyle: {
                        opacity: 1,
                        'margin-left': '5px',
                        'padding': '1px 7px 3px 7px',
                        'border-radius': '0.2em',
                        'background-color': 'white'
                    }
                }),
                // Initialize the plugin that adds a dragable region over the waveform
                RegionsPlugin.create()
            ]
        });
        waveSurfer.on('ready', () => this.onWaveSurferReady(waveSurfer));
        waveSurfer.loadBlob(fileToPlay);
    }

    /**
     * Start listening to region events.
     * Draw the region itself.
     */
    onWaveSurferReady = (waveSurfer: WaveSurfer) => {
        waveSurfer.on('region-update-end', this.onCropRegionUpdateEnd);
        waveSurfer.on('region-updated', this.onCropRegionUpdated);

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
            waveSurfer,
            cutStart,
            cutEnd,
        });
    }

    /**
     * Called when the draggable area has been moved.
     * Recreate region if starting end overlaps the ending.
     */
    onCropRegionUpdated = (params) => {
        const { start, end } = params;
        const { cutStart, cutEnd, waveSurfer, isPlaying } = this.state;

        if (!waveSurfer)
            return;

        // Check if one end of the region was dragged over the other one
        if (Math.abs(start - end) > 0.25)
            return;

        // Recreate region from last know valid positions
        waveSurfer.clearRegions();
        const newRegion = waveSurfer.addRegion({
            start: cutStart,
            end: cutEnd,
            color: this.REGION_COLOR
        });

        if (isPlaying)
            newRegion.play();

        this.setState({
            waveSurfer
        });
    }

    /**
     * Called when the draggable area has finished moving (any dragging stopped).
     * Update the cut's start and end times.
     */
    onCropRegionUpdateEnd = (params) => {
        const { start, end } = params;
        const { cutStart, cutEnd, waveSurfer } = this.state;

        if (!waveSurfer)
            return;

        let playFrom = 0;

        // The ending region was moved
        if (end !== cutEnd) {
            playFrom = end;
            this.setState({
                cutEnd: end
            });
        }

        // The starting region was moved
        if (start !== cutStart) {
            playFrom = start;
            this.setState({
                cutStart: start
            });
        }

        waveSurfer.play(playFrom);
        this.setState({
            isPlaying: true
        });
    }

    /**
     * Stop audio playback.
     */
    componentWillUnmount = () => {
        const { waveSurfer } = this.state;

        if (!waveSurfer)
            return;

        waveSurfer.destroy();
    }

    /** 
     * Play or pause the audio playback.
     */
    handleClickTogglePlay = () => {
        const { waveSurfer, isPlaying } = this.state;
        if (!waveSurfer)
            return;

        if (isPlaying)
            waveSurfer.pause();
        else
            waveSurfer.play();

        this.setState({ isPlaying: !isPlaying });
    }

    /**
     * Skip the playback forwards or backwards by 5 seconds.
     */
    handleClickSkip = (skipForwards: boolean = true) => {
        const { waveSurfer } = this.state;
        if (!waveSurfer)
            return;

        if (skipForwards)
            waveSurfer.skipForward();
        else
            waveSurfer.skipBackward();
    }

    /**
     * Jump the playback to the beginning/end of the song.
     */
    handleClickJump = (jumpToEnd: boolean = true) => {
        const { isPlaying, waveSurfer } = this.state;
        if (!waveSurfer)
            return;

        if (jumpToEnd) {
            const duration = waveSurfer.getDuration();
            const current = waveSurfer.getCurrentTime();
            waveSurfer.skip(duration - current - 5);
            waveSurfer.pause();
            waveSurfer.skipForward();
            this.setState({ isPlaying: false });
        } else {
            waveSurfer.stop();
            // If the song isn't playing - don't start it
            if (isPlaying)
                waveSurfer.play();
        }
    }

    render() {
        const { waveSurfer, isPlaying } = this.state;
        const isLoading = waveSurfer ? false : true;
        const toggleIcon = `fas fa-${isPlaying ? 'pause' : 'play'} mzt-btn-actions`;

        return (
            <LoadingOverlay
                className='loading-spinner'
                active={isLoading}
                text='Generating audio wave..'
                spinner={true}
                fadeSpeed={200}
            >

                <div className={`row mzt-row-waveform ${isLoading ? 'mzt-hidden' : ''}`}>
                    <div className='col'>
                        <div className='row'>
                            <div className='col'>
                                <div className='waveform' />
                            </div>
                        </div>
                        <div className='row justify-content-center'>

                            {/* [BUTTON] Jump to the beginning of the song */}
                            <div className='col-1' >
                                <Tippy content='Jump to start' arrow={true}
                                    placement='bottom'
                                    delay={400}
                                >
                                    <i className="fas fa-step-backward mzt-btn-actions"
                                        onClick={() => this.handleClickJump(false)} />
                                </Tippy>
                            </div>

                            {/* [BUTTON] Rewind 5 seconds */}
                            <div className='col-1'>
                                <Tippy content='Rewind 5 seconds'
                                    arrow={true}
                                    placement='bottom'
                                    delay={400}
                                >
                                    <i className="fas fa-chevron-left mzt-btn-actions"
                                        onClick={() => this.handleClickSkip(false)} />
                                </Tippy>
                                
                            </div>

                            {/* [BUTTON] Play/pause the song */}
                            <div className='col-1'>
                                <Tippy content='Play / pause'
                                    arrow={true}
                                    placement='bottom'
                                    delay={400}
                                >
                                    <i className={toggleIcon}
                                        onClick={() => this.handleClickTogglePlay()} />
                                </Tippy>
                            </div>

                            {/* [BUTTON] Fast forward 5 seconds */}
                            <div className='col-1' >
                                <Tippy content='Fast forward 5 seconds'
                                    arrow={true}
                                    placement='bottom'
                                    delay={400}
                                >
                                <i className="fas fa-chevron-right mzt-btn-actions"
                                    onClick={() => this.handleClickSkip(true)} />
                                </Tippy>
                            </div>

                            {/* [BUTTON] Jump to end */}
                            <div className='col-1' >
                                <Tippy content='Jump to end'
                                    arrow={true}
                                    placement='bottom'
                                    delay={400}
                                >
                                <i className="fas fa-step-forward mzt-btn-actions"
                                    title='Jump to the end of the song'
                                    onClick={() => this.handleClickJump(true)} />
                                </Tippy>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        );
    }
}

export default AudioPlayer;