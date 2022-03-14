import backgroundImage from '../../assets/images/landing-background.jpeg';
import "./Landing.module.scss";

const Landing = () => {
    return (
        <div className="landing">
            <img className="landing__img" src={backgroundImage} alt="landing page background" />
            <div className="landing__overlay"></div>
            <div className="landing__title">
                <h1 className="landing__primary">Your Journey Begins Here</h1>
                <p className="landing__secondary"> create your first trip by logging in or signing up</p>
            </div>
        </div>
    );
};

export default Landing;
