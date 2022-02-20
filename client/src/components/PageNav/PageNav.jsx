import logo from "../../assets/icons/logo.png"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import "./PageNav.scss";

import store from "../../state/store";

const PageNav = (props) => {
    const { pathname } = useLocation();
    // handle log out
    const logOut = () => {
        sessionStorage.removeItem("token");
        window.location.href = "/";
    }
    useEffect(() => {
        if (pathname === "/signup") {
            document.getElementById("signup").classList.add("page-nav__button--active");
            document.getElementById("login").classList.remove("page-nav__button--active");
        } else if (pathname === "/login") {
            document.getElementById("login").classList.add("page-nav__button--active");
            document.getElementById("signup").classList.remove("page-nav__button--active");
        } else if (document.getElementById("login")) {
            if (document.getElementById("login").classList.contains("page-nav__button--active")) {
                document.getElementById("login").classList.remove("page-nav__button--active");
            }
            if (document.getElementById("signup").classList.contains("page-nav__button--active")) {
                document.getElementById("signup").classList.remove("page-nav__button--active");
            }
        }
    }, [pathname]);
    // if the user is not logged in, show the sign up & login button
    // if the user is logged in, show the logout button and user name
    if (!props.isAuthenticated) {
        return (
            <div className="page-nav">
                <div className="page-nav__logo-wrap">
                    <Link className="page-nav__logo-link" to="/"><img className="page-nav__logo" src={logo} alt="logo" /></Link>
                </div>
                <div className="page-nav__profile">
                    <Link className="page-nav__signup page-nav__button" id="signup" to="/signup">Sign Up</Link>
                    <Link className="page-nav__login page-nav__button"id="login" to="/login">Log In</Link>
                </div>
            </div>
        );
    } else {
        return (
            <div className="page-nav">
                <div className="page-nav__logo-wrap">
                    <Link className="page-nav__logo-link" to="/"><img className="page-nav__logo" src={logo} alt="logo" /></Link>
                </div>
                <div className="page-nav__profile">
                    <Link to="/" className="page-nav__username page-nav__button">{props.username}</Link>
                    <Link to="/" onClick={logOut} className="page-nav__log-out page-nav__button">Log Out</Link>
                </div>
            </div>
        );
    }
};

export default PageNav;