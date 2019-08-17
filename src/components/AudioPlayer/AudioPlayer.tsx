import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoadingOverlay from 'react-loading-overlay';
import Song from '../../models/song';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js';
import './audio-player.css';

type Props = {
    songToPlay: Song;
    fileToPlay: File;
};
type State = {
    isPlaying: boolean;
    waveSurfer?: WaveSurfer;
};

class AudioPlayer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isPlaying: false,
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
            cursorColor: '#007bff',
            waveColor: '#525353',
            progressColor: '#232526',
            skipLength: 5,
            plugins: [
                CursorPlugin.create({
                    customStyle: {
                        // the cursor doesn't center to the mouse so we shift it
                        'margin-left': '13.5px'
                    },
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
                })
            ]
        });
        waveSurfer.on('ready', () => {
            this.setState({ waveSurfer });
        });
        waveSurfer.loadBlob(fileToPlay);
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
                            <div className='col-1' >
                                <i className="fas fa-step-backward mzt-btn-actions"
                                    title='Jump to the beginning of the song'
                                    onClick={() => this.handleClickJump(false)} />
                            </div>
                            <div className='col-1'>
                                <i className="fas fa-chevron-left mzt-btn-actions"
                                    title='Skip the song backwards 5 seconds'
                                    onClick={() => this.handleClickSkip(false)} />
                            </div>
                            <div className='col-1'>
                                <i className={toggleIcon}
                                    title='Play/pause the song'
                                    onClick={() => this.handleClickTogglePlay()} />
                            </div>
                            <div className='col-1' >
                                <i className="fas fa-chevron-right mzt-btn-actions"
                                    title='Skip the song forwards 5 seconds'
                                    onClick={() => this.handleClickSkip(true)} />
                            </div>
                            <div className='col-1' >
                                <i className="fas fa-step-forward mzt-btn-actions"
                                    title='Jump to the end of the song'
                                    onClick={() => this.handleClickJump(true)} />
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
        );
    }
}

export default AudioPlayer;