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

const initialState = {
    trip: [],
    error: null
};

// trip data reducer
export default (state = initialState, action) => {
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
                trip: state.trip.filter(trip => trip.tripId !== action.payload)
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