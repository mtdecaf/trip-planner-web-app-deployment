import "./PlannerPage.module.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Timetable from 'react-timetable-events'
import axios from "../../middleware/axiosConfig";

import AddEventModal from "../../components/AddEventModal/AddEventModal";

// import state
import { useSelector } from "react-redux";
import store from "../../state/store";
import { updateTrip, removeTrip } from "../../state/features/trip";

const PlannerPage = () => {
    const { tripId } = useParams();
    
    const [ dates, setDates ] = useState([]);

    const [currentTripData, setCurrentTripData] = useState();

    const [toggleAddEvent, setToggleAddEvent] = useState(false);
    const [toggleEditName, setToggleEditName] = useState(false);

    // fail safe for when trying to load a schedule with out getting the data first
    const [isReady, setIsReady] = useState(false);

    // const tripData = useSelector(state => state.trip.trip);

    const getTripData = useSelector(state => state.trip.trip).find(trip => trip.tripId === tripId);
    // on load, get the trip data
    useEffect(() => {
        setCurrentTripData(getTripData);
    }, [getTripData]);

    // only do this when currentTripData is fetched from the server
    useEffect(() => {
        // check if the currentTripData exists
        if (currentTripData) {
            let dateFrame = [];
            let startDate = new Date(currentTripData.startDate);
            let endDate = new Date(currentTripData.endDate);
            endDate.setDate(endDate.getDate() + 1);
            let currentDate = startDate;
            while (currentDate <= endDate) {
                let date = new Date(currentDate);
                dateFrame.push(date);
                currentDate.setDate(currentDate.getDate() + 1);
            }
            setDates(dateFrame);
            // go through the currentTripData.events object
            for (const key in currentTripData.events) {
                // check if the populated arrays, and change the startTime and endTime to Date objects if the startTime or endTime are also strings
                if (currentTripData.events[key].length > 0) {
                    // loop through the array, and change the startTime and endTime to Date objects
                    for (let i = 0; i < currentTripData.events[key].length; i++) {
                        currentTripData.events[key][i].startTime = new Date(currentTripData.events[key][i].startTime);
                        currentTripData.events[key][i].endTime = new Date(currentTripData.events[key][i].endTime);
                    }
                }
            }
            
            axios.post(`/addevents/${tripId}`, currentTripData.events
            , {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then()
            .catch()
            setIsReady(true);
        }
    }, [currentTripData]);

    // create a temporary string to hold the new trip name
    const changeTripName = (e) => {
        // change the trip name in the tripData object
        setCurrentTripData({
            ...currentTripData,
            tripName: e.target.value
        })
    }

    // update the trip name
    const toggleEditTripsName = (e) => {
        if (toggleEditName) {
            // check if the trip name is empty
            if (currentTripData.tripName) {
                // if it is not empty, update the trip name in the tripData object
                updateTripData();
                setToggleEditName(false);
                setIsReady(false);
            } else {
                alert("Please enter a trip name");
            }

        } else {
            // if it is empty, return an error
            setToggleEditName(true);
        }
    }

    const updateTripData = () => {
        store.dispatch(updateTrip(tripId, currentTripData, {
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        }));
    }

    // add an event to the calendar
    const addEvent = () => {
        if (toggleAddEvent) {
            setToggleAddEvent(false);
        } else {
            setToggleAddEvent(true);
        }
    }

    const deleteTrip = () => {
        // ask the user if they are sure they want to delete the trip
        if (window.confirm("Are you sure you want to delete this trip?")) {
            store.dispatch(removeTrip(tripId,{
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            }));
        }
    }

    return (
        <>
            {currentTripData ? 
                <div className="planner-page">
                    <div className="planner-page__calendar">
                        <div className="calendar__header">
                            <div className="calendar__name-wrap">
                                {!toggleEditName ? <h1 className="calendar__title">{currentTripData.tripName}</h1>:
                                <input className="calendar__title" type="text" value={currentTripData.tripName} onChange={changeTripName}/>}
                                <span onClick={toggleEditTripsName} className="calendar__edit"><img src="https://img.icons8.com/ios/50/000000/edit-file.png" alt="edit trip name button"/></span>
                            </div>
                            <div className="calendar__add-delete-wrap">
                                <span onClick={addEvent} className="calendar__add"><img src="https://img.icons8.com/ios/50/000000/add--v1.png" alt="add event button"/></span>
                                <span onClick={deleteTrip} className="calendar__delete"><img src="https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-delete-miscellaneous-kiranshastry-lineal-kiranshastry.png" alt="delete current trip button"/></span>
                            </div>
                        </div>
                        <div className="calendar__days">
                            { isReady ? 
                                <div>
                                    <Timetable 
                                        events = {currentTripData.events}
                                    />
                                </div>
                            : <div>No days to display</div>
                                }
                        </div>
                    </div>
                    {toggleAddEvent ? 
                        <AddEventModal 
                        dates={dates} 
                        currentTripData={currentTripData} 
                        setCurrentTripData={setCurrentTripData} 
                        setToggleAddEvent={setToggleAddEvent} 
                        isReady={isReady} 
                        setIsReady={setIsReady} 
                        />
                    : null}
                </div>
                : 
                <div className="planner-page__error">
                    <p>The trip you are trying to access doesn't exist or you are logged out</p>
                    <button onClick={() => window.location.href = "/"}>Create a Trip</button>
                </div>
            }
        </>
    )
};

export default PlannerPage;