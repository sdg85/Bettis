import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import AuthLink from '../UI/Links/AuthLink';
import AuthButton from '../UI/Buttons/AuthButton';
import AuthHeaderText from '../UI/HeaderTexts/AuthHeaderText';

const signInForm = props => {
    return (
        <Form onSubmit={props.submit} name="signin">
            <div>
                <AuthHeaderText>Sign In</AuthHeaderText>
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
            <AuthButton type="submit" >Sign in</AuthButton>
            <div style={{ textAlign:"center" }}>
                <p>or</p>
                <AuthLink navTo="/signup" >Register</AuthLink>
            </div>
            
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
    box-shadow: 0.05rem 0.05rem 0.5rem #eee;

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
        outline-color: #0c3d68;
    }
`;