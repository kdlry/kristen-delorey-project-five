import React from 'react';

const StagingArea = (props) => {

    const { createVinyl } = props;

    return (
        <div className="finalConf">
            <p className="conf">Nice choice!</p>
            <p className="conf">Click on the arrow below to see your vinyl cover.</p>

            <button
                className="finalizeButton"
                onClick={createVinyl}
                type="submit"
                aria-label="click here to see your vinyl record cover">
                <span className="fa-stack fa-2x" role="img" aria-hidden="true">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fas fa-arrow-down fa-stack-1x fa-inverse"></i>
                </span>
            </button>
        </div>
    )
}

export default StagingArea;