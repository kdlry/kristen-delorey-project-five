import React from 'react';

const BandForm = (props) => {

    const { bandValue, setBandValue, saveBandValue } = props
    
    return (
        <div className="bandForm">
            <p>Let's start with a band name. Whatever you fancy.</p>

            <div>
                <form action="submit" id="bandForm">
                    <div className="formContainer">
                        <label htmlFor="findName" sr-only="enter band name here"></label>
                        <input 
                            type="text" 
                            id="findName" 
                            maxLength = "13"
                            onChange={setBandValue}
                            value={bandValue} 
                            placeholder="ex: The Misfits"/>
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
        </div>
    )
}

export default BandForm;