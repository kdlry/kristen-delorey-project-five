import React from 'react';

const SearchImage = () => {
    console.log('Do something')
    return (
        <div>
            <form action="">
                <div>
                    <label className="sr-only" htmlFor="searchImage">Choose a band name:</label>
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