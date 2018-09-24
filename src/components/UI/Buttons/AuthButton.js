import React from 'react';
import styled from 'styled-components';

const authButton = props => {
    return <Button>{props.children}</Button>
}

export default authButton;

const Button = styled.button`
    border: 1px solid #eee;
    color: #fff;
    padding: 10px;
    background: #0c3d68;
    border-radius: 6px;
    text-transform: uppercase;
    font-size: 16px;
    cursor: pointer;
    display: inline-block;
    transition-duration: 0.4s;
    font-weight: 600;

    &:hover{
        background-color: #2d7fb5;
        color: #fff;
        border: 2px solid #eee5c6;
    }
`;