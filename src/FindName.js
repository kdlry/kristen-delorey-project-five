import React from 'react';

const FindName = () => {
    console.log('Do something')
    return (
        <div className="bandForm">
            <form action="submit">
                <div className="inputLabel">
                    <label htmlFor="findName">Choose a band name:</label>
                    <input
                        // className=""
                        // onChange=
                        type="text"
                        name="findName"
                        id="findName"
                        placeholder="The Misfits" />
                </div>
                <div>
                    <button
                        // className=""
                        // onClick=
                        type='submit'>
                        Submit
                    </button>
                </div>

            </form>
        </div>
    )
}

export default FindName;