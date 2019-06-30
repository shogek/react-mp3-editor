import React from 'react';

type Props = {
    handleClick: Function;
    handleFileSelect: Function
};

function UploadSongsButton(props: Props) {
    return (
        <div className='row justify-content-center mzt-row-upload-songs'>
            <div className='col-2'>

                {/* Visible */}
                <div
                    className="btn btn-primary"
                    onClick={() => props.handleClick()}
                >
                    Upload songs
                </div>

                {/* Hidden */}
                <input
                    id="btn-upload-songs"
                    type='file'
                    multiple
                    accept='.mp3'
                    onChange={(e) => props.handleFileSelect(e)} />
            </div>
        </div>
    );
}

export default UploadSongsButton;