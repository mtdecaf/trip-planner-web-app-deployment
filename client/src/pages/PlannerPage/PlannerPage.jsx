import "./PlannerPage.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Timetable from 'react-timetable-events'
import axios from "../../middleware/axiosConfig";

import AddEventModal from "../../components/AddEventModal/AddEventModal";

const PlannerPage = (props) => {
    const { tripId } = useParams()
    
    const [ dates, setDates ] = useState([]);

    const [tripData, setTripData] = useState({});

    const [events, setEvents] = useState();

    const [toggleAddEvent, setToggleAddEvent] = useState(false);
    
    const [toggleEditName, setToggleEditName] = useState(false);

    const [tripName, setTripName] = useState("");

    // fail safe for when trying to load a schedule with out getting the data first
    const [isReady, setIsReady] = useState(false);

    // on load, get the trip data
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        axios.get(`/getcurrenttrip/${tripId}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            setTripData(res.data);
        })
        .catch(err => {
        })
    }, [tripId])

    // only do this when tripData is fetched from the server
    useEffect(() => {
        // check if the tripData is populated
        if (Object.keys(tripData).length > 0) {
            let dateFrame = [];
            // check if the tripData.events is populated
            if (tripData.events && Object.keys(tripData.events).length > 0) {
                // the events are populated
                // get the dates
                let startDate = new Date(tripData.startDate);
                let endDate = new Date(tripData.endDate);
                endDate.setDate(endDate.getDate() + 1);
                let currentDate = startDate;
                while (currentDate <= endDate) {
                    let date = new Date(currentDate);
                    dateFrame.push(date);
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                setDates(dateFrame);

                // go through the tripData.events object
                for (const key in tripData.events) {
                    // check if the populated arrays, and change the startTime and endTime to Date objects if the startTime or endTime are also strings
                    if (tripData.events[key].length > 0) {
                        // loop through the array, and change the startTime and endTime to Date objects
                        for (let i = 0; i < tripData.events[key].length; i++) {
                            tripData.events[key][i].startTime = new Date(tripData.events[key][i].startTime);
                            tripData.events[key][i].endTime = new Date(tripData.events[key][i].endTime);
                        }
                    }
                }

                setEvents(tripData.events);
                
                // set the tripName to the tripData.tripName
                setTripName(tripData.tripName);
                axios.post(`/addevents/${tripId}`, tripData
                , {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                .then()
                .catch()
                // set the trip name for editing use
                setTripName(tripData.tripName);
                setIsReady(true);
            } else {
                // the events are not populated
                // populate the events with empty arrays for each date from the start date to the end date, including the start date and end date
                let timeFrame = [];
                let blankEvents = {};
                let startDate = new Date(tripData.startDate);
                // add one day to the end date to include the end date
                let endDate = new Date(tripData.endDate);
                endDate.setDate(endDate.getDate() + 1);
                let currentDate = startDate;
                while (currentDate <= endDate) {
                    let date = new Date(currentDate);
                    dateFrame.push(date);
                    timeFrame.push(convertDay(date.getDay()));
                    currentDate.setDate(currentDate.getDate() + 1);
                }
                // cast the timeFrame to an object of empty arrays
                timeFrame.forEach(date => {
                    blankEvents[date] = [];
                })
                tripData.events = blankEvents;
                setEvents(tripData.events);
                setDates(dateFrame);
                
                // set the trip name for editing use
                setTripName(tripData.tripName);
                
                // update the tripData on the backend
                axios.post(`/addevents/${tripId}`, tripData
                , {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                .then(res => {
                })
                setIsReady(true);
            }
        }
    }, [tripId, tripData])

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

    // redirect to home page
    const redirectAddTrip = () => {
        window.location.href = "/";
    }


    // create a temporary string to hold the new trip name
    const changeTripName = (e) => {
        // change the trip name in the tripData object
        setTripName(e.target.value);
    }

    // update the trip name
    const toggleEditTripsName = (e) => {
        if (toggleEditName) {
            // check if the trip name is empty
            if (tripName) {
                // if it is empty, return an error
                // if it is not empty, update the trip name in the tripData object
                // set the tripData with the updated trip name
                tripData.tripName = tripName;
                props.setTripData(Object.assign(
                    {},
                    {
                        ...props.tripData,
                        tripName: tripName
                    }
                ));
                // update the trip name on the backend
                axios.put(`/edittrip/${tripId}`,
                tripData,
                {
                    headers: {
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
                .then(res => {
                })
                .catch(err => {
                })
                setToggleEditName(false);
            } else {
                alert("Please enter a trip name");
            }

        } else {
            setToggleEditName(true);
        }
    }

    // add an event to the calendar
    const addEvent = (e) => {
        if (toggleAddEvent) {
            setToggleAddEvent(false);
        } else {
        setToggleAddEvent(true);
        }
    }

    const deleteTrip = (e) => {
        // ask the user if they are sure they want to delete the trip
        if (window.confirm("Are you sure you want to delete this trip?")) {
            // delete the trip from the backend
            axios.delete(`/deletetrip/${tripId}`,
            {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            })
            .then(res => {
                // redirect to the home page
                window.location.href = "/";
            })
            .catch(err => {
            })
        }
    }

    return (
        <>
            {tripData.tripName !== "" && tripData.events ? 
                <div className="planner-page">
                    <div className="planner-page__calendar">
                        <div className="calendar__header">
                            <div className="calendar__name-wrap">
                                {!toggleEditName ? <h1 className="calendar__title">{tripData.tripName}</h1>:
                                <input className="calendar__title" type="text" value={tripName} onChange={changeTripName}/>}
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
                                        events = {tripData.events}
                                    />
                                </div>
                            : <div>No days to display</div>
                                }
                        </div>
                    </div>
                    {toggleAddEvent ? 
                        <AddEventModal 
                        events={events} 
                        dates={dates} 
                        tripData={tripData} 
                        setTripData={setTripData} 
                        setToggleAddEvent={setToggleAddEvent} 
                        isReady={isReady} 
                        setIsReady={setIsReady} 
                        />
                    : null}
                </div>
                : 
                <div className="planner-page__error">
                    <p>The trip you are trying to access doesn't exist or you are logged out</p>
                    <button onClick={redirectAddTrip}>Create a Trip</button>
                </div>
            }
        </>
    )
};


export default PlannerPage;