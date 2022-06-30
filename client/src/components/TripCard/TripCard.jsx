import styles from "./TripCard.module.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const TripCard = (props) => {
    const openTrip = () => {
        window.location.href = `/planner/${props.tripData.tripId}`;
    };

    return(
        <>
            <h1 onClick={openTrip} className={cx("trip-card__name")}>{props.tripData.tripName}</h1>
        </>
    )
};

export default TripCard;