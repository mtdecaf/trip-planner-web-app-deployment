import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { v4 as uuidv4 } from 'uuid';

import './AddTripModal.module.scss';

// import state
import { useSelector } from "react-redux";
import { addTrip } from "../../state/features/trip";
import store from "../../state/store";

const AddTripModal = (props) => {
    const email = useSelector(state => state.auth.email);
    const [date, setDate] = useState(null);

    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');

    // variables
    const button = document.getElementById("submit-button");
    let tripName = document.getElementById("add-trip__trip-name");

    useEffect(() => {
        const button = document.getElementById("submit-button");
        const currentDate = new Date();
        if (startLocation && endLocation && date && tripName.value) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
        setDate(currentDate);
    }, []);

    const handleDateSelection = (e) => {
        setDate(e);
        return date;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // create an id for the trip with uuid
        const tripId = uuidv4();
        let startDate = new Date(date[0]);
        let endDate = new Date(date[1]);
        let diff = Math.abs(startDate.getTime() - endDate.getTime());
        let days = Math.ceil(diff / (1000 * 3600 * 24));
        
        // populate the events object with empty arrays for each date from the start date to the end date, including the start date and end date
        let events = {};
        for (let i = 0; i <= days; i++) {
            let date = new Date(startDate.getTime() + (86400000 * i));
            date = convertDay(date.getDay());
            events[date] = [];
        }

        let tripData = {
            date,
            startLocation,
            endLocation,
            tripName: tripName.value,
            email,
            tripId,
            events
        }

        if(days <= 7) {
            // post the information to the backend
            store.dispatch(addTrip(tripData));

        } else {
            alert("Please select a trip duration of less than 7 days.")
        }
    }

    const convertDay = (day) => {
        // convert the day number to monday, tuesday, etc.
        switch (day) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            default:
                return "";
        }
    }

    const handleChange = (e) => {
        // Changes the state of the start location and end location
        if (e.target.id === 'startLocation') {
            setStartLocation(e.target.value);
        } else if (e.target.id === 'endLocation') {
            setEndLocation(e.target.value);
        }
    }

    // change the value of the trip name to the value of the input when both startLocation and endLocation has value; unless the user manually changed it, in which case, do nothing
    // THIS CAN BE IMPROVED: NEEDS TO HAPPEN AFTER handleChange() IS RESOLVED
    if (tripName){
        if (startLocation && endLocation && tripName.value === `${startLocation} + ' to ' + ${endLocation}`) {
            // if the user manually changes the trip name, the value of the trip name will be the value of the input and not the start and end location
            if (tripName.value !== startLocation + ' to ' + endLocation) {
                tripName.value = startLocation + ' to ' + endLocation;
                return;
            } else {
                tripName.value = startLocation + ' to ' + endLocation;
            }
    
        } else if (startLocation && endLocation) {
            tripName.value = startLocation + ' to ' + endLocation;
        } else {
            tripName.value = '';
        }
    }

    const updateButton = (e) => {
        if (date.length === 2 && startLocation && endLocation && tripName.value.length > 0) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }


    const handleChangeAndUpdateButton = (e) => {
        // run the handleChange promise
        handleChange(e);
        updateButton(e);
    }
    const handleDateSelectionAndUpdateButton = (e) => {
        handleDateSelection(e);
        updateButton(e);
    }

    return (
        <div className="add-trip">
            <div className="add-trip__modal">
                <div className="add-trip__date-selection">
                    <h1 className="add-trip__title">Pick A Time</h1>
                    <Calendar
                        className={['c1','c2']}
                        selectRange={true}
                        onChange={handleDateSelectionAndUpdateButton}
                        onClickDay={updateButton}
                    />
                </div>
                <form className="add-trip__form" onSubmit={handleSubmit}>
                    
                    <input className="add-trip__input" type="text" onChange={handleChangeAndUpdateButton} name="startLocation" id="startLocation" placeholder="Start Location" value={startLocation} />
                    <input className="add-trip__input" type="text" onChange={handleChangeAndUpdateButton} name="endLocation" id="endLocation" placeholder="End Location" value={endLocation} />

                    <input className="add-trip__input" type="text" onChange={updateButton} name="tripName" id="add-trip__trip-name" placeholder="Enter a trip name" />
                    <button className="add-trip__button add-trip__submit" type="submit" id="submit-button">Start Planning</button>
                    <button className="add-trip__button add-trip__cancel" onClick={props.toggleAddTrip}>Cancel</button>
                </form>
            </div>
        </div>
    );
    }

export default AddTripModal;