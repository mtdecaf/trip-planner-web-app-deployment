import logo from "../../../public/icons/logo.png"
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from "./PageNav.module.scss";

const PageNav = (props) => {
    const { pathname } = useRouter();
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
            <div className={styles["page-nav"]}>
                <ul className={styles["page-nav__logo-wrap"]}>
                    <li className={styles["page-nav__list"]}>
                        <Link className={styles["page-nav__logo-link"]} href="/">
                            <a>
                                <div className={styles["page-nav__logo"]}>
                                    <Image src={logo} alt="logo" />
                                </div>
                            </a>
                        </Link>
                    </li>
                </ul>
                <ul className={styles["page-nav__features"]}>
                    <li className={styles["page-nav__list"]}>
                        <Link id="signup" href="/signup"><a className={[styles["page-nav__signup"], styles["page-nav__button"]].join(' ')}>Sign Up</a></Link>
                    </li>
                    <li className={styles["page-nav__list"]}>
                        <Link id="login" href="/login"><a className={[styles["page-nav__login"], styles["page-nav__button"]].join(' ')}>Log In</a></Link>
                    </li>
                </ul>
            </div>
        );
    } else {
        return (
            <div className={styles[page-nav]}>
                <ul className={styles[page-nav__logo-wrap]}>
                    <li className={styles["page-nav__list"]}>
                        <Link className={styles[page-nav__logo-link]} href="/"><a><img className={styles[page-nav__logo]} src={logo} alt="logo" /></a></Link>
                    </li>
                </ul>
                <ul className={styles.page-nav__features}>
                    <li className={styles["page-nav__list"]}>
                        <Link className={[styles[page-nav__username], styles[page-nav__button]].join(' ')} href="/"><a>{props.username}</a></Link>
                    </li>
                    <li className={styles["page-nav__list"]}>
                        <Link className={[styles[page-nav__log-out], styles[page-nav__button]].join(' ')}  href="/" onClick={logOut} ><a>Log Out</a></Link>
                    </li>
                </ul>
            </div>
        );
    }
};

export default PageNav;