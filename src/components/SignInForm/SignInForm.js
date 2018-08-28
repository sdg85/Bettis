import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const signInForm = props => {
    return (
        <Form onSubmit={props.submit} name="signin">
        <div>
            <h2>Sign In</h2>
        </div>
            <Input
                id="email"
                valid={props.email.valid}
                value={props.email.value}
                touched={props.email.touched}
                type="text"
                placeholder={props.email.placeholder}
                onChange={props.onChanged} />
            <Input
                id="password"
                valid={props.password.valid}
                value={props.password.value}
                touched={props.password.touched}
                type="password"
                placeholder={props.password.placeholder}
                onChange={props.onChanged} />
            <Button type="submit" >Sign in</Button>
            <br/>
            <NavLink to="/signup" >Not a member? Click here</NavLink>
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
    border: ${ props => {
        return !props.valid && props.touched ? "1px solid #cf0c1e" : "1px solid #eee"
    }
    };
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