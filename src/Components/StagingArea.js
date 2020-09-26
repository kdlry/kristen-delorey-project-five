import React from 'react';

const StagingArea = (props) => {

    const { url, selectImage } = props

    return (
        <li>
            <div className="imageContainer">
                <img src={url} alt="Vinyl artwork option" />
            </div>
            <button className="selectImageButton"
                onClick={selectImage}
                type="submit"
                aria-label="click here to select this vinyl artwork">
                <span className="fa-stack fa-2x" role="img" aria-hidden="true">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fas fa-check fa-stack-1x fa-inverse"></i>
                </span>
            </button>
        </li>
    )
}

export default StagingArea;