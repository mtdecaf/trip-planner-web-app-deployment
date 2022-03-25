import { useState } from "react";
import Link from "next/link";
import { connect, useSelector, useDispatch } from "react-redux";

import styles from "./LogIn.module.scss";

import { login } from "../../state/features/auth";

const LogIn = () => {
    const dispatch = useDispatch()
    // states for the form for logging in
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    // handle form submission
    const handleSubmit = e => {
        console.log("handleSubmit");
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
        dispatch(login(email, password));
    };

    return (
        <div className={styles["log-in"]}>
            <div className={styles["log-in__wrap"]}>
                <h1 className={styles["log-in__title"]}>Log In</h1>
                <form className={styles["log-in__form"]} onSubmit={handleSubmit}>
                    <label className={styles["log-in__form-label"]}>Email:</label>
                    <input className={styles["log-in__form-input"]} type="text" name="email" onChange={handleChange} value={user.email} />
                    <label className={styles["log-in__form-label"]}>Password:</label>
                    <input className={styles["log-in__form-input"]} type="password" name="password" onChange={handleChange} value={user.password} />
                    {errorMessage && <p className={styles["log-in__error"]}>{errorMessage}</p>}
                    {/* if the user is logged in, redirect to the home page */}
                    <button className={styles["log-in__form-button"]} type="submit">Log In</button>
                    <Link href="/"><a className={styles["log-in__form-button"]}>Cancel</a></Link>
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