import React from 'react';

const ImageForm = (props) => {

    const { imageValue, setImageValue, saveImageValue } = props

    return (
        <div className="imageForm">
            <form action="submit" id="imageForm">
                <div className="inputContainer">
                    <label htmlFor="searchImage">FIND AN IMAGE: </label>
                    <input
                        type="text"
                        id="searchImage"
                        onChange={setImageValue}
                        value={imageValue}
                        placeholder="ex: Fluffy clouds" />
                </div>
                <div>
                    <button className="searchImageButton"
                        onClick={saveImageValue}
                        type='submit'
                        aria-label="click here to search for keyword">
                        <span className="fa-stack fa-2x" role="img" aria-hidden="true">
                            <i className="fas fa-circle fa-stack-2x"></i>
                            <i className="fas fa-search fa-stack-1x fa-inverse"></i>
                        </span>
                    </button>
                        
                </div>
            </form>

        </div>
    )
}

export default ImageForm;