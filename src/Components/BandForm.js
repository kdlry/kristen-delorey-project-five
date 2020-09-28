import React from 'react';

const BandForm = (props) => {

    const { bandValue, setBandValue, saveBandValue } = props
    
    return (
        <div className="bandForm">
            <form action="submit" id="bandForm">
                <div className="formContainer">
                    <label htmlFor="findName">CHOOSE A BAND NAME:</label>
                    <input 
                        type="text" 
                        id="findName" 
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
    )
}

export default BandForm;