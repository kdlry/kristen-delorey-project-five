import React from 'react';

const ImageForm = (props) => {

    const { imageValue, setImageValue, saveImageValue } = props

    return (
        <div className="imageFormContainer">
            <form className="imageForm" action="submit" id="imageForm">

                <div className="formContainer">
                    <label htmlFor="searchImage" sr-only="enter band name here"></label>
                    <input
                        type="text"
                        id="searchImage"
                        maxLength = "25"
                        onChange={setImageValue}
                        value={imageValue}
                        placeholder="ex: Fluffy clouds" />
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