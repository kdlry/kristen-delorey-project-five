import React from 'react';

const ImageForm = (props) => {

    const { imageValue, setImageValue, saveImageValue } = props

    return (
        <div>
            <form className="imageForm" action="submit" id="imageForm">

                <div className="imageFormContainer">
                    <label htmlFor="searchImage" sr-only="enter band name here"></label>
                    <input
                        type="text"
                        id="searchImage"
                        maxLength = "25"
                        onChange={setImageValue}
                        value={imageValue}
                        placeholder="ex: lemon tree" />
                    <p>Max. length: 25 characters</p>
                </div>
                
                <div>
                    <button 
                        className="searchImageButton"
                        type="submit" 
                        onClick={saveImageValue}>submit
                    </button>
                </div>

            </form>
        </div>
    )
}

export default ImageForm;