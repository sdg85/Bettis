import React from 'react';
import styled from 'styled-components';

const authHeaderText = props => {
    return <HeaderText>{props.children}</HeaderText>
}

export default authHeaderText;

const HeaderText = styled.h1`
    color: #011f43;
    text-shadow: 0.04em 0.04em 0.9em #0c3d689e;
    font-size: 24px;
`;