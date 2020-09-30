import React from 'react';

const BandForm = (props) => {

    const { bandValue, setBandValue, saveBandValue } = props
    
    return (
        <div className="stepOne">
            <h3>Let's start with a band name. Your choice.</h3>

            <form className="bandForm" action="submit" id="bandForm">
                <div className="bandFormContainer">
                    <label htmlFor="findName" sr-only="enter band name here"></label>
                    <input 
                        type="text" 
                        id="findName" 
                        maxLength = "13"
                        onChange={setBandValue}
                        value={bandValue} 
                        placeholder="ex: The Coders"/>
                    <p>Max. length: 13 characters</p>
                </div>

                <div>
                    <button 
                        className="nameButton" 
                        type="submit" 
                        onClick={saveBandValue}>submit
                    </button>
                </div>
            </form>   
        </div>
    )
}

export default BandForm;