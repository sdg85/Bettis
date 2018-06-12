import React from 'react';
import styled from 'styled-components';

const toolbar = () => {
    return (
        <ToolbarContainer>
            <NavContainer>
                <a href="/" >Bet</a>
            </NavContainer>
            <img style={{ borderRadius: "10px", margin: 10 }} src="https://acmwallethu.files.wordpress.com/2018/04/58a6139d037b10734c0b9336808b923f.jpg?w=223&h=300" width="100px" height="100px" alt="WORLD CUP 2018" />
            <NavContainer />
        </ToolbarContainer>
    );
}

export default toolbar;

const ToolbarContainer = styled.div`
    /* margin: 0 10px 10px 10px; */
    position: fixed;
    /* overflow: hidden; */
    top: 0;
    z-index: 999999999;
    display: flex;
    width: 100%;
    background-color: #fff;
    box-shadow: 0.05rem 0.05rem 1.1rem rgba(20,20,20,0.27);
`;

const NavContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    box-shadow: 0.05rem 0.05rem 1.1rem rgba(20,20,20,0.27);
    justify-content: center;
    align-items: center;
`;