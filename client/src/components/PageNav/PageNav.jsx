import logo from "../../../public/icons/logo.png";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./PageNav.module.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const PageNav = (props) => {
  const { pathname } = useRouter();
  // handle log out
  const logOut = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };
  useEffect(() => {
    if (pathname === "/signup") {
      document
        .getElementById("signup")
        .classList.add("page-nav__button--active");
      document
        .getElementById("login")
        .classList.remove("page-nav__button--active");
    } else if (pathname === "/login") {
      document
        .getElementById("login")
        .classList.add("page-nav__button--active");
      document
        .getElementById("signup")
        .classList.remove("page-nav__button--active");
    } else if (document.getElementById("login")) {
      if (
        document
          .getElementById("login")
          .classList.contains("page-nav__button--active")
      ) {
        document
          .getElementById("login")
          .classList.remove("page-nav__button--active");
      }
      if (
        document
          .getElementById("signup")
          .classList.contains("page-nav__button--active")
      ) {
        document
          .getElementById("signup")
          .classList.remove("page-nav__button--active");
      }
    }
  }, [pathname]);
  // if the user is not logged in, show the sign up & login button
  // if the user is logged in, show the logout button and user name
  if (!props.isAuthenticated) {
    return (
      <div className={cx("page-nav")}>
        <ul className={cx("page-nav__logo-wrap")}>
          <li className={cx("page-nav__list")}>
            <Link className={cx("page-nav__logo-link")} href="/">
              <a>
                <div className={cx("page-nav__logo")}>
                  <Image src={logo} alt="logo" />
                </div>
              </a>
            </Link>
          </li>
        </ul>
        <ul className={cx("page-nav__features")}>
          <li className={cx("page-nav__list", "page-nav__list-features")}>
            <Link href="/signup">
              <a
                id="signup"
                className={cx("page-nav__signup", "page-nav__button")}
              >
                Sign Up
              </a>
            </Link>
          </li>
          <li className={cx("page-nav__list", "page-nav__list-features")}>
            <Link href="/login">
              <a
                id="login"
                className={cx("page-nav__login", "page-nav__button")}
              >
                Log In
              </a>
            </Link>
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className={cx("page-nav")}>
        <ul className={cx("page-nav__logo-wrap")}>
          <li className={cx("page-nav__list")}>
            <Link href="/">
              <a className={cx("page-nav__logo-link")}>
                <div className={cx("page-nav__logo")}>
                  <Image src={logo} alt="logo" />
                </div>
              </a>
            </Link>
          </li>
        </ul>
        <ul className={cx("page-nav__features")}>
          <li className={cx("page-nav__list", "page-nav__list-features")}>
            <Link href="/">
              <a className={cx("page-nav__username", "page-nav__button")}>
                {props.username}
              </a>
            </Link>
          </li>
          <li className={cx("page-nav__list", "page-nav__list-features")}>
            <Link href="/" onClick={logOut}>
              <a className={cx("page-nav__log-out", "page-nav__button")}>
                Log Out
              </a>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
};

export default PageNav;
