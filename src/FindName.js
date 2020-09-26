import React from 'react';

const FindName = (props) => {

    const { band, captureBand } = props
    console.log(props);
    
    return (
        <div className="bandForm">
            <form action="submit">
                <div className="inputContainer">
                    <label htmlFor="findName">CHOOSE A BAND NAME:</label>
                    <input type="text" id="findName" onChange={captureBand} value={band} placeholder="ex: The Misfits"/>
                </div>
                <div>
                    <button class="nameButton" type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default FindName;