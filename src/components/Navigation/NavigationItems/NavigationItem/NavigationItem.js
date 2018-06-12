import React from 'react';
import styled from 'styled-components';

const navigationItem = () => {
    return (
        <List>
            <NavLink
            to="/table"
            active />
        </List>
    );
}

export default navigationItem;

const List = styled.li`

`;

const NavLink = styled.NavLink`
    
`;