import React from "react";
import Spinner from '../../../../assets/spinner.gif';
const spinner = () => {
    return(
        <div style={{ textAlign:"center" }}>
            <img src={Spinner} alt="loading..." />
        </div>
    );
}

export default spinner;

