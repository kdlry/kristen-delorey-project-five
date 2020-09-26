import React from 'react';

const BandForm = (props) => {

    // const setData = (data) => {
    //     setValue(data)
    //     console.log("Form>", data);
    // }

    const { value, setValue, saveValue } = props
    
    return (
        <div className="bandForm">
            <form action="submit">
                <div className="inputContainer">
                    <label htmlFor="findName">CHOOSE A BAND NAME:</label>
                    <input 
                    type="text" 
                    id="findName" 
                    onChange={setValue} 
                    value={value} 
                    placeholder="ex: The Misfits"/>
                </div>
                <div>
                    <button 
                    className="nameButton" 
                    type='submit' 
                    onClick={saveValue}>submit</button>
                </div>
            </form>
        </div>
    )
}

export default BandForm;