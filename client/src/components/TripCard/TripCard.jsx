import "./TripCard.scss";

const TripCard = (props) => {
    const openTrip = () => {
        window.location.href = `/planner/${props.tripData.tripId}`;
    };

    return(
        <>
            <h1 onClick={openTrip} className="trip-card__name">{props.tripData.tripName}</h1>
        </>
    )
};

export default TripCard;