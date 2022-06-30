import backgroundImage from '../../../public/images/landing-background.jpeg';
import Image from "next/image"

import styles from "./Landing.module.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const Landing = () => {
    return (
        <div className={cx("landing")}>
            <Image className={cx("landing__img")} src={backgroundImage} alt="landing page background" />
            <div className={cx("landing__overlay")}></div>
            <div className={cx("landing__title")}>
                <h1 className={cx("landing__primary")}>Your Journey Begins Here</h1>
                <p className={cx("landing__secondary")}> create your first trip by logging in or signing up</p>
            </div>
        </div>
    );
};

export default Landing;
