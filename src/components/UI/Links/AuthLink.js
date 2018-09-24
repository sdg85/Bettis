import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const authLink = props => {
    return(
        <Link to={props.navTo}>{props.children}</Link>
    );
}

export default authLink;

const Link = styled(NavLink)`
    color: #0c3d68;
    text-decoration: none;
    font-weight: 600;
`;