import React from 'react';
import { SongStatuses } from './songStatuses';
import './song-status.css';

type Props = {
    status: SongStatuses;
};

function SongStatus(props: Props) {
    let className = '';
    switch (props.status) {
        case SongStatuses.Saved:
            className = 'status-saved';
            break;
        case SongStatuses.Modified:
            className = 'status-modified';
            break;
        case SongStatuses.Original:
            className = 'status-original';
            break;
        default:
            new Error('Unknown SongStatus type!');
    }

    return (
        <div className='row'>
            <div className='col'>
                <div className={'mzt-status ' + className}></div>
            </div>
        </div>
    );
}

export default SongStatus;