import React from 'react';
import styled from 'styled-components';
import { withRouter, NavLink } from 'react-router-dom';

const signUpForm = props => {
    return (
        <Form onSubmit={props.submit} name="signup">
            <div>
                <h2>Sign Up</h2>
            </div>
            <Input
                type="text"
                id="firstName"
                value={props.firstName}
                onChange={props.firstNameChanged}
                placeholder="first name"
            />
            <Input
                type="text"
                id="lastName"
                value={props.lastName}
                onChange={props.lastNameChanged}
                placeholder="last name"
            />
            <Input
                value={props.email}
                id="email"
                type="email"
                placeholder="Email"
                onChange={props.emailChanged} />
            <Input
                value={props.password}
                id="password"
                type="password"
                placeholder="Passoword"
                onChange={props.passwordChanged} />
            <UploadContainer>
                <Input type="file" id="file" placeholder="profile image" onChange={props.fileUploadChanged} />
            </UploadContainer>
            {props.imgUrl ? <img src={props.imgUrl} width="100" height="100" alt="Profile" /> : null}

            <Button type="submit" >Sign Up</Button>
            <br />
            <NavLink to="/signin" >Already a member? Click here</NavLink>
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
    border: 1px solid #eee;
    padding: 10px;
    margin-bottom: 5px;
    transition-duration: 0.8s;
    &:focus{
        outline-color: #2d7fb5;
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

const UploadContainer = styled.div`
    display: flex;
`;