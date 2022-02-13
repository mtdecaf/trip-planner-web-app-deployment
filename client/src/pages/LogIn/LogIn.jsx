import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../../middleware/axiosConfig";
import { connect } from "react-redux";
import "./LogIn.scss";

import store from '../../state/store';
import { login } from "../../state/features/auth";

const LogIn = () => {
    // states for the form for logging in
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const isAuthenticated = store.getState().auth.isAuthenticated;
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // handle form submission
    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = user;
        if (!email){
            setErrorMessage("Please enter an email");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrorMessage("Email address is invalid");
        }
        if (!password){
            setErrorMessage("Please enter a password");
        }
        store.dispatch(
            login(email, password)
        );
    };

    useEffect(() => {
        // if the token is in session storage, redirect to the home page
        if (sessionStorage.getItem("token")) {
            window.location.href = "/";
        }
    }, [store.getState().auth.isAuthenticated]);

    return (
        <div className="log-in">
            <div className="log-in__wrap">
                <h1 className="log-in__title">Log In</h1>
                <form className="log-in__form" onSubmit={handleSubmit}>
                    <label className="log-in__form-label">Email:</label>
                    <input className="log-in__form-input" type="text" name="email" onChange={handleChange} value={user.email} />
                    <label className="log-in__form-label">Password:</label>
                    <input className="log-in__form-input" type="password" name="password" onChange={handleChange} value={user.password} />
                    {errorMessage && <p className="log-in__error">{errorMessage}</p>}
                    {/* if the user is logged in, redirect to the home page */}
                    {isAuthenticated ? <Navigate to="/" /> : <input className="log-in__form-button" type="submit" value="Log In" />}
                    <Link to="/" className="log-in__form-button">Cancel</Link>
                </form>
            </div>
        </div>
    );
};

// connect the redux store to the component
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        email: state.auth.email,
        authToken: state.auth.authToken
    };
};

export default connect(mapStateToProps, {login})(LogIn);