import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authLogout } from '../../store/actions/index';

import styled from 'styled-components';
import { NavLink, withRouter } from 'react-router-dom';

class SideNav extends Component {

    logoutHandler = e => {
        this.props.close();
        this.props.onLogout();
        this.props.history.push("/signin");
    }

    render() {
        return (
            <Nav open={this.props.isOpen}>
                <CloseBtn open={this.props.isOpen} onClick={this.props.close} >x</CloseBtn>
                <Link open={this.props.isOpen} onClick={this.props.close} to="/" >Bet</Link>
                <Link open={this.props.isOpen} onClick={this.props.close} to="/table" >Table</Link>
                <Logout
                    open={this.props.isOpen && this.props.authenticated}
                    onClick={this.logoutHandler}>Logout</Logout>
            </Nav>

        );
    }
};

const mapStateToProps = state => {
    return {
        authenticated: state.auth.tokenId !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideNav));

const Nav = styled.div`
    height: 100%; /* 100% Full-height */
    width: ${ props => props.open ? "250px" : "0"}; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1001; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #011f43; 
    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 60px; /* Place content 60px from the top */
    transition: 300ms; /* 0.5 second transition effect to slide in the sidenav */
`;

const Link = styled(NavLink)`
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #eee;
    display: block;
    transition: 0.s;
    opacity: ${ props => props.open ? "1" : "0"};
    cursor: pointer;
    text-shadow: 0.04em 0.04em 0.9em #eee;
    &:hover{
        color:#fff;
        text-shadow: 0.04em 0.04em 3.0em #fff;
    }
`;
const Logout = styled.div`
    padding: 8px 8px 8px 32px;
    font-size: 25px;
    color: #eee;
    display: block;
    transition: 0.8s;
    opacity: ${ props => props.open ? "1" : "0"};
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
    right: ${ props => props.open ? "25px" : "200px"};
    font-size: 36px;
    color: #fff;
    transition: 0.9s
    cursor: pointer;
    text-shadow: 0.04em 0.04em 0.9em #eee;
`;