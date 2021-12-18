import axios from "../../middleware/axiosConfig";
import { useState } from "react";

import "./SignUp.scss";

const UserAuth = () => {
    // states for the form for creating a new user
    const [user, createUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState("")
    // handle form changes
    const handleChange = (e) => {
        setErrorMessage("")
        createUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // record the form data on submit
        const form = e.target;
        const passwordConfirmation = form.elements.passwordConfirmation.value;

        const {username, email, password} = user;
        console.log(username, email, password, passwordConfirmation, user);
        // username, email, password validation
        if (!username){
            setErrorMessage ("Username is required");
            return
        } 
        if (!email){
            setErrorMessage("Please enter an email");
            return
        } else if (!/(.+)@(.+){2,}\.(.+){2,}/.test(user.email)) {
            setErrorMessage("Email address is invalid");
            return
        }
        if (!password){
            setErrorMessage("Please enter a password");
        }
        if (!passwordConfirmation){
            setErrorMessage("Please enter a password confirmation");
        }
        // check password confirmation
        if (password !== passwordConfirmation){
            setErrorMessage("Passwords do not match");
            return;
        }
        // create a new user with state data
        createUser({
            ...user,
            [e.target.name]: e.target.value
        });
        // post only the username, email, and password to the server
        axios.post("/signup", { username, email, password })
        .then(res => {
        })
        // go to login page if user is created
        .then(res => window.location.href = "/login")
        // reset the form
        .then(res => user.reset())
        .catch(err => setErrorMessage(err.response.data.message));
    };

    return (
        <div className="sign-up">
            <div className="sign-up__wrap">
                <h1 className="sign-up__title">Sign Up</h1>
                <form className="sign-up__form" action="userSignUp" onSubmit={handleSubmit}>
                    <label className="sign-up__form-label" htmlFor="username">Username<span>*</span></label>
                    <input className="sign-up__form-input" type="text" name="username" id="username" onChange={handleChange} value={ user.username } />
                    <label className="sign-up__form-label" htmlFor="email">Email<span>*</span></label>
                    <input className="sign-up__form-input" type="text" name="email" id="email" onChange={handleChange} value={ user.email } />
                    <label className="sign-up__form-label" htmlFor="password">Password<span>*</span></label>
                    <input className="sign-up__form-input" type="password" name="password" id="password" onChange={handleChange} />
                    <label className="sign-up__form-label" htmlFor="passwordConfirmation">Confirm Password*</label>
                    <input className="sign-up__form-input" type="password" name="passwordConfirmation" id="passwordConfirmation" onChange={handleChange} />
                    {errorMessage && <p className="sign-up__error">{errorMessage}</p>}
                    <input className="sign-up__form-button" type="submit" value="Sign Up" />
                </form>
            </div>
        </div>
    );
};

export default UserAuth;