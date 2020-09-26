import React from 'react';

const SearchImage = () => {

    return (
        <div clasName="imageForm">
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
                        <span class="fa-stack fa-2x" role="img" aria-hidden="true">
                            <i class="fas fa-circle fa-stack-2x"></i>
                            <i class="fas fa-search fa-stack-1x fa-inverse"></i>
                        </span>
                    </button>
                        
                </div>
            </form>

        </div>
    )
}

export default SearchImage;