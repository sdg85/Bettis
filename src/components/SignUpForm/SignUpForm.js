import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import AuthButton from '../UI/Buttons/AuthButton';
import AuthLink from '../UI/Links/AuthLink';
import AuthHeaderText from '../UI/HeaderTexts/AuthHeaderText';


const signUpForm = props => {
    const fields = props.fields;

    return (
        <Form onSubmit={props.submit} name="signup">
            <div>
                <AuthHeaderText>Sign Up</AuthHeaderText>
            </div>
            <Input
                type="text"
                id="firstName"
                value={fields.firstName.value}
                valid={fields.firstName.valid}
                touched={fields.firstName.touched}
                onChange={props.onChanged}
                placeholder="first name" />
            
            <Input
                type="text"
                id="lastName"
                value={fields.lastName.value}
                onChange={props.onChanged}
                placeholder="last name"
                valid={fields.lastName.valid}
                touched={fields.lastName.touched} />
            
            <Input
                value={fields.email.value}
                id="email"
                type="email"
                placeholder="Email"
                valid={fields.email.valid}
                touched={fields.email.touched}
                onChange={props.onChanged} />
            
            <Input
                value={fields.password.value}
                id="password"
                type="password"
                placeholder="Passoword"
                valid={fields.password.valid}
                touched={fields.password.touched}
                onChange={props.onChanged} />
            <br />
            <UploadContainer>
                <label>Profile picture</label>
                <Input
                    type="file"
                    id="file"
                    accept="image/*"
                    valid={fields.imgUrl.valid}
                    placeholder="profile image"
                    onChange={props.onChanged} />
            </UploadContainer>
            
            {fields.imgUrl.value ? <img src={fields.imgUrl.value} width="100" height="100" alt="Profile" /> : null}
            
            <AuthButton type="submit" disabled={props.disabled}>Sign Up</AuthButton>
            <div style={{ textAlign:"center" }}>
                <p>or</p>
                <AuthLink navTo="/signin" >Sign in</AuthLink>
            </div>
        </Form>
    );
}

export default withRouter(signUpForm);

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
    transition-duration: 0.8s;
    &:focus{
        outline-color: #2d7fb5;
    }
`;

const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;
`;