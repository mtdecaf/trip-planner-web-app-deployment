import logo from "../../assets/icons/logo.png"
import { Link } from "react-router-dom";

import "./PageNav.scss";

const PageNav = (props) => {

    // log out function
    const logOut = () => {
        sessionStorage.removeItem("token");
        window.location.href = "/";
    }

    // if the user is not logged in, show the sign up & login button
    // if the user is logged in, show the logout button and user name
    if (!props.isLoggedIn) {
        return (
            <div className="page-nav">
                <div className="page-nav__logo-wrap">
                    <Link className="page-nav__logo-link" to="/"><img className="page-nav__logo" src={logo} alt="logo" /></Link>
                </div>
                <div className="page-nav__profile">
                    <Link className="page-nav__signup page-nav__button" to="/signup">Sign Up</Link>
                    <Link className="page-nav__login page-nav__button" to="/login">Log In</Link>
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