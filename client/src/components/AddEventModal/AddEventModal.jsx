import axios from "../../middleware/axiosConfig";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "./AddEventModal.scss";

const AddEventModal = (props) => {
    const { tripId } = useParams()

    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        // get all the information from the form and validate it
        const eventArray = Object.entries(props.tripData.events);
        const form = e.target;
        const eventDay = form.eventDay.value;

        // find the position of the day in the array
        const dayPosition = eventArray.findIndex((day) => day[0] === eventDay);
        const eventType = form.eventType.value;
        const eventDescription = form.eventDescription.value;
        const eventLocation = form.eventLocation.value;
        const price = form.price.value;

        // validate all the fields are filled out
        if (
            !eventDay ||
            !eventType ||
            !eventDescription ||
            !eventLocation ||
            !form.startTime.value ||
            !form.endTime.value ||
            !price
        ) {
            setErrorMessage("Please fill out all the fields.");
        }
        else if (form.startTime.value > form.endTime.value) {
            // the start time must be before the end time
            setErrorMessage("Please make sure the start time is before the end time.");
        } else {
            // get the year, month and day from the date and connect with -, inclued the 0 if the month or day is less than 10
            const eventDate = props.dates[dayPosition];
            const year = eventDate.getFullYear();
            const month = eventDate.getMonth() + 1;
            const day = eventDate.getDate();
            const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
            const startTime = `${formattedDate}T${form.startTime.value}:00`;
            const endTime = `${formattedDate}T${form.endTime.value}:00`;

            // change the tripData's events object to include the new event in addition to the other properties
            const newTripData = Object.assign(
                {},
                {
                    ...props.tripData,
                    events: {
                        ...props.tripData.events,
                        [eventDay]: [
                            ...props.tripData.events[eventDay],
                            {
                                id: uuidv4(),
                                type: eventType,
                                description: eventDescription,
                                name: `${eventType}: ${eventDescription} at ${eventLocation} costing $${price}`,
                                location: eventLocation,
                                startTime: startTime,
                                endTime: endTime,
                                price: price,
                            },
                        ],
                    }
                }
            );
            // set the tripData to the new tripData with updated events on the eventDay with a new reference
            props.setTripData(newTripData);
            props.setIsReady(false);

            // close the modal
            props.setToggleAddEvent();
        }
    }
    const handleCancel = (e) => {
        e.preventDefault();
        props.setToggleAddEvent();
    }
    return (
        <div className="add-event">
            <div className="add-event__modal">
                <h1 className="add-event__modal-title">Add Event</h1>
                <form className="add-event__form" onSubmit={handleSubmit}>
                    <select className="add-event__select add-event__element add-event__input" name="eventDay" id="event-day">
                        <option value="">Select a day</option>
                        {
                            Object.keys(props.tripData.events).map((day, index) => {
                                return <option key={index} value={day}>{day}</option>
                            })
                        }
                    </select>
                    <select className="add-event__select add-event__element add-event__input" name="eventType" id="event-type">
                        {/* list of road trip activities */}
                        <option value="">Select an event type</option>
                        <option value="food">🍔Food</option>
                        <option value="driving">🚗Driving</option>
                        <option value="shopping">🛍Shopping</option>
                        <option value="hiking">🚶Hiking</option>
                        <option value="camping">🏔Camping</option>
                        <option value="rest">🛌Rest</option>
                        <option value="other">🤷‍♂️Other</option>
                    </select>
                    {/* input for event description */}
                    <label className="add-event__label" htmlFor="eventDescription">Event Description</label>
                    <input className="add-event__input add-event__element" type="text" name="eventDescription" id="event-description" placeholder="Event Description" />
                    {/* input for event time */}
                    <label className="add-event__label" htmlFor="startTime">Start Time</label>
                    <input className="add-event__input add-event__element" type="time" name="startTime" id="startTime" />
                    <label className="add-event__label" htmlFor="endTime">End Time</label>
                    <input className="add-event__input add-event__element" type="time" name="endTime" id="endTime" />
                    {/* input for event location */}
                    <label className="add-event__label" htmlFor="eventLocation">Location</label>
                    <input className="add-event__input add-event__element" type="text" name="eventLocation" id="event-location" placeholder="Location" />
                    {/* input for event price */}
                    <label className="add-event__label" htmlFor="price">Price</label>
                    <input className="add-event__input add-event__element" type="number" min="0" step=".01" name="price" id="price" placeholder="Price" />
                    {/* submit */}
                    {errorMessage && <p className="add-event__error">{errorMessage}</p>}
                    <button className="add-event__button" type="submit">Add Event</button>
                    <button className="add-event__button" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default AddEventModal;