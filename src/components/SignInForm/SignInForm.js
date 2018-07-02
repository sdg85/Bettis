import React from 'react';
import styled from 'styled-components';

const signInForm = props => {
    return (
        <Form onSubmit={props.submit}>
            <Input
                value={props.username}
                type="text"
                placeholder="Email..."
                onChange={props.usernameChanged} />
            <Input
                value={props.password}
                type="password"
                placeholder="Passoword..."
                onChange={props.passwordChanged} />
            <Button type="submit" >Sign in</Button>
        </Form>
    );
}

export default signInForm;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 20px;
    border: 2px solid #eee5c6;
    padding: 10px;
    background: rgba(255,255,255,0.81);
    box-shadow: 0.05rem 0.05rem 1.1rem rgba(20,20,20,0.2);

    @media(min-width: 600px){
        width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
`;

const Input = styled.input`
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 5px;
    &:focus{
        outline-color: #afa421;
    }
`;

const Button = styled.button`
    border: 2px solid #cf0c1e;
    color: #cf0c1e;
    padding: 10px;
    background: transparent;
    border-radius: 6px;
    text-transform: uppercase;
    font-size: 16px;
    cursor: pointer;
    display: inline-block;
    transition-duration: 0.4s;
    font-weight: 600;

    &:hover{
        background-color: #cf0c1e;
        color: #fff;
        border: 2px solid #eee5c6;
    }
`;