import React from 'react';
import styled from 'styled-components';

const authButton = props => {
    return <Button disabled={props.disabled} >{props.children}</Button>
}

export default authButton;

const Button = styled.button`
    border: 1px solid #eee;
    color: #fff;
    padding: 10px;
    background: ${ props => props.disabled ? "#ccc" : "#0c3d68" };
    border-radius: 6px;
    text-transform: uppercase;
    font-size: 16px;
    cursor: pointer;
    display: inline-block;
    transition-duration: 0.4s;
    font-weight: 600;

    &:hover{
        background-color: ${ props => props.disabled ? "#ccc" : "#2d7fb5" };
        color: #fff;
        border: ${ props => props.disabled ? "" : "2px solid #eee5c6" };
    }
`;