import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const sideNav = ({ isOpen, closeSideNav }) => {
    return (
        <SideNav open={isOpen}>
            <CloseBtn open={isOpen} onClick={closeSideNav} >x</CloseBtn>
            <Link open={isOpen} onClick={closeSideNav} to="/" >Bet</Link>
            <Link open={isOpen} onClick={closeSideNav} to="/table" >Table</Link>
        </SideNav>
    );
}

export default sideNav;

const SideNav = styled.div`
    height: 100%; /* 100% Full-height */
    width: ${ props => props.open ? "280px" : "0" }; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1001; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #011f43; /* Black*/
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
`;

const Link = styled(NavLink)`
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #eee;
    display: block;
    transition: 0.8s;
    opacity: ${ props => props.open ? "1" : "0" };
    cursor: pointer;
    text-shadow: 0.04em 0.04em 0.9em #eee;
    &:hover{
        color:#fff;
        text-shadow: 0.04em 0.04em 3.0em #fff;
    }
`;

const CloseBtn = styled.a`
    position: absolute;
    top: 10px;
    right: ${ props => props.open ? "25px" : "200px" };
    font-size: 36px;
    color: #fff;
    transition: 0.9s
    cursor: pointer;
    text-shadow: 0.04em 0.04em 0.9em #eee;
`;