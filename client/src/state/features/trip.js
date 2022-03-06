import axios from "../../middleware/axiosConfig";

// manage a user's trip data
const TRIP_RETRIEVE = "TRIP_RETRIEVE";
const TRIP_ADD = "TRIP_ADD";
const TRIP_REMOVE = "TRIP_REMOVE";
const TRIP_UPDATE = "TRIP_UPDATE";


// trip data action creators
export const retrieveTrip = (authHeader) => async dispatch => {
    try {
        const res = await axios.get("/gettrip", authHeader);
        dispatch({
            type: TRIP_RETRIEVE,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
}

export const addTrip = (tripData) => async dispatch => {
    try {
        const res = await axios.post("/addtrip", tripData);
        dispatch({
            type: TRIP_ADD,
            payload: res.data
        });
        window.location.href = `/planner/${tripData.tripId}`;
    } catch (error) {
        console.log(error);
    }
}

export const removeTrip = (tripId, authHeader) => async dispatch => {
    try {
        const res = await axios.delete(`/deletetrip/${tripId}`, authHeader);
        dispatch({
            type: TRIP_REMOVE,
            payload: res.data
        });
        window.location.href = "/";
    } catch (error) {
        console.log(error);
    }
}

export const updateTrip = (tripId, currentTripData, authHeader) => async dispatch => {
    try {
        const res = await axios.put(`/edittrip/${tripId}`, currentTripData, authHeader);
        dispatch({
            type: TRIP_UPDATE,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
}

const initialState = {
    trip: [],
    error: null
};

// trip data reducer
const tripReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRIP_RETRIEVE:
            return {
                ...state,
                trip: action.payload
            };
        case TRIP_ADD:
            return {
                ...state,
                trip: [...state.trip, action.payload]
            };
        case TRIP_REMOVE:
            return {
                ...state,
                trip: state.trip.filter(trip => trip.tripId !== action.payload.tripId)
            };
        case TRIP_UPDATE:
            return {
                ...state,
                trip: state.trip.map(trip => trip.tripId === action.payload.tripId ? action.payload : trip)
            };
        default:
            return state;
    }
}

export default tripReducer;