import React from 'react';

const ImageForm = () => {

    return (
        <div className="imageForm">
            <form action="submit">
                <div className="inputContainer">
                    <label htmlFor="searchImage">FIND AN IMAGE: </label>
                    <input
                        className="searchInput"
                        // onChange=
                        type="text"
                        name="searchImage"
                        id="searchImage"
                        placeholder="ex: Fluffy clouds" />
                </div>
                <div>
                    <button className="searchButton"
                        // className=""
                        // onClick=
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