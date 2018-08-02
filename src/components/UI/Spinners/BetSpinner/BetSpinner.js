import React from 'react';
import Img from '../../../../assets/bet-loader.gif';


const betSpinner = () => {
    return(
        <div style={{ textAlign:"center" }}>
            <img src={Img} width="100px" height="15" alt="spinner" />
        </div>
    );
}

export default betSpinner;