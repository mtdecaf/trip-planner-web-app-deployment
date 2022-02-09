import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "../../middleware/axiosConfig";
import "./LogIn.scss";
import { login } from "../../store/features/auth";

const LogIn = () => {
    // states for the form for logging in
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [isloggedIn, setIsLoggedIn] = useState(false);
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
        // make a post the login info to the server, if successful, set isLoggedIn to true
        // axios.post("/login", { email, password })
        // .then(res => {
        //     setIsLoggedIn(true);
        //     // store the token in session storage if successful
        //     sessionStorage.setItem("token", res.data.token);
        //     window.location.href = "/";
        // })
        // // if not successful, alert the user
        // .catch(err => {
        //     setErrorMessage("Email or password is incorrect");
        // });
        // call login action
        login(email, password);
    };

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
                    {isloggedIn ? <Navigate to="/" /> : <input className="log-in__form-button" type="submit" value="Log In" />}
                    <Link to="/" className="log-in__form-button">Cancel</Link>
                </form>
            </div>
        </div>
    );
};

export default LogIn;