import React from 'react';

const SearchImage = () => {
    console.log('Do something')
    return (
        <div clasName="imageForm">
            <form action="">
                <div>
                    <label className="inputLabel" htmlFor="searchImage">Search for a keyword:</label>
                    <input
                        // className=""
                        // onChange=
                        type="text"
                        name="searchImage"
                        id="searchImage"
                        placeholder="Pink clouds" />
                </div>

                <button
                    // className=""
                    // onClick=
                    type='submit'>
                    Submit
                </button>
            </form>

        </div>
    )
}

export default SearchImage;