import React from 'react'
import './ImageLinkForm.css'

function ImageLinkForm({onInputChange, onPictureSubmit}) {
    return (
        <div>
            <p className="text-1">
                {'"This Magic brain will detect faces in your pictures. Give it a try"'}
            </p>
            <div className = "input-container">
                <input type="text" className="input-feild" onChange = {onInputChange} />
                <button className="button" onClick = {onPictureSubmit}>
                    Detect
                </button>
            </div>
        </div>
    )
}

export default ImageLinkForm
