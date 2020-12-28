//@flow
import * as React from 'react';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { UserActions } from '../redux/user';

import { loginSchema } from './Validation';
import LoginFormInputs from './LoginFormInputs';

import './LoginForm.scss';

const LoginForm = (): React.Node => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.loggedIn);
    const error = useSelector(state => state.user.error);

    const onLogin = React.useCallback(
        values => {
            const { email, password } = values;
            dispatch(UserActions.login(email, password));
        },
        [dispatch],
    );

    return !isLoggedIn ? (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={onLogin}
        >
            {({ handleSubmit, handleChange, values, errors }) => (
                <>
                    <Form noValidate onSubmit={handleSubmit}>
                        <LoginFormInputs
                            handleChange={handleChange}
                            values={values}
                            errors={errors}
                        />
                    </Form>
                    {error !== null ? <div className={'login-error'}>{error}</div> : null}
                    <div className={'text-center'}>
                        <Button variant={'primary'} type={'submit'} onClick={handleSubmit}>
                            Login
                        </Button>
                    </div>
                </>
            )}
        </Formik>
    ) : (
        <Redirect to="/" />
    );
};

export default LoginForm;


//v2
// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import "./LoginForm.scss";
//
// export default function LoginForm() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//
//     function validateForm() {
//         return email.length > 0 && password.length > 0;
//     }
//
//     function handleSubmit(event) {
//         event.preventDefault();
//     }
//
//     return (
//         <div className="Login">
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group size="lg" controlId="email">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                         autoFocus
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Form.Group size="lg" controlId="password">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Button block size="lg" type="submit" disabled={!validateForm()}>
//                     Login
//                 </Button>
//             </Form>
//         </div>
//     );
//}