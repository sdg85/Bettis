import React from 'react';
import styled from 'styled-components';

const toolbar = props => {
    return (
        <ToolbarContainer>
            <div onClick={props.openSideNav}>
                <Bar />
                <Bar />
                <Bar />
            </div>
           <HeaderText>BETTIS</HeaderText>
        </ToolbarContainer>
    );
}

export default toolbar;

const Bar = styled.div`
    width: 30px;
    height: 3px;
    background-color: #fff;
    margin: 6px 0;
    box-shadow: 0.05rem 0.05rem 0.3rem rgb(255, 255, 255);
`;

const ToolbarContainer = styled.div`
    position: fixed;
    padding: 20px;
    box-sizing: border-box;
    align-content: center;
    align-items: center;
    top: 0;
    z-index: 1000;
    display: flex;
    width: 100%;
    background-color: #011f43a1;
    box-shadow: 0.05rem 0.05rem 5rem rgba(255,255,255,0.81);
`;

const HeaderText = styled.h1`
    color: #fff;
    margin: auto;
    text-shadow: 0.04em 0.04em 0.9em #eee;
`;