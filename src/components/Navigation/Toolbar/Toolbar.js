import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/wc_2018_logo.jpg';

const toolbar = props => {
    return (
        <ToolbarContainer>
            <div onClick={props.openSideNav}>
                <Bar />
                <Bar />
                <Bar />
            </div>
           <HeaderText>BETTIS</HeaderText>
            {/* <div style={{ justifyItems: "center", margin: "auto" }}>
                <Nav to="/" >BET</Nav>
                <Nav to="/table" >TABLE</Nav>
            </div> */}
        </ToolbarContainer>
    );
}

export default toolbar;

const ImgContainer = styled.div`
    margin: 10px;
    box-shadow: 2px 2px 10px rgba(20,20,20,0.27);
`;

const Bar = styled.div`
    width: 30px;
    height: 3px;
    background-color: #fff;
    margin: 6px 0;
    box-shadow: 0.05rem 0.05rem 0.3rem rgb(255, 255, 255);
`;

const Nav = styled(NavLink) `
    padding: 20px;
    box-sizing: border-box;
    background-color: #cf0c1e;
    text-decoration-style: none;
    text-decoration: none;
    margin: 10px;
    color: #fff;
    max-height: 60px;
    max-width: 90px;
    text-align: center;
    border: 2px solid #eee5c6;
    font-weight: 600;
    box-shadow: 0.05rem 0.05rem 1.1rem rgba(20,20,20,0.27);
    &:hover{
        background-color: #eee5c6;
    }
    &:selected {
        background-color: #eee5c6;
    }
    /* &:focus {
        background-color: #eee5c6;
    } */
`;

const ToolbarContainer = styled.div`
    /* margin: 0 10px 10px 10px; */
    position: fixed;
    padding: 20px;
    box-sizing: border-box;
    align-content: center;
    align-items: center;
    /* overflow: hidden; */
    top: 0;
    z-index: 1000;
    display: flex;
    width: 100%;
    background-color: #011f43a1;
    /* border-bottom: 1px solid #e09299c2; */
    box-shadow: 0.05rem 0.05rem 5rem rgba(255,255,255,0.81);
`;

const HeaderText = styled.h1`
    color: #fff;
    margin: auto;
    text-shadow: 0.04em 0.04em 0.9em #eee;
`;