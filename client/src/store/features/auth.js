import axios from "../../middleware/axiosConfig";
// authentication and authorization action types
const AUTH_LOGIN = 'AUTH_LOGIN';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_ERROR = 'AUTH_ERROR';

// authentication and authorization action creators
export const login = (email, password) => async dispatch => {
    try {
        // authendicate user, get the token
        const res = await axios.post('/login', { email, password });
        dispatch({
            type: AUTH_LOGIN,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
            payload: error
        });
    }
};

// authentication and authorization reducer
const initialState = {
    isAuthenticated: false,
    error: null
};
export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                email: action.payload.email,
                error: null
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                email: '',
                error: null
            };
        case AUTH_ERROR:
            return {
                ...state,
                email: '',
                error: action.payload.error
            };
        default:
            return state;
    }
}