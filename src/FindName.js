import React from 'react';

const FindName = () => {
    console.log('Do something')
    return (
        <div>
            <form action="">
                <div>
                    <label className="sr-only" htmlFor="findName">Choose a band name:</label>
                    <input
                        // className=""
                        // onChange=
                        type="text"
                        name="findName"
                        id="findName"
                        placeholder="The Misfits" />
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

export default FindName;