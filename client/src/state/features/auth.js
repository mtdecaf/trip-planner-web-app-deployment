import axios from "../../middleware/axiosConfig";

// authentication and authorization action types
const AUTH_LOGIN = 'AUTH_LOGIN';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_AUTHENTICATE = 'AUTH_AUTHENTICATE';
const AUTH_ERROR = 'AUTH_ERROR';

const setAuthToken = token => {
    sessionStorage.setItem('token', token);
}
// authentication and authorization action creators
export const login = (email, password) => async dispatch => {
    try {
        const res = await axios.post('/login', { email, password });
        setAuthToken(res.data.token);
        // authendicate user, get the token
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

export const logout = () => dispatch => {
    dispatch({
        type: AUTH_LOGOUT
    });
};

export const authendicate = (authHeader) => async dispatch => {
    try {
        const res = await axios.get('/welcome', authHeader);
        dispatch({
            type: AUTH_AUTHENTICATE,
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
    username: '',
    authToken: '',
    email: '',
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.username,
                authToken: action.payload.token,
                email: action.payload.email,
                error: null
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                authToken: '',
                email: '',
                error: null
            };
        case AUTH_AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.username,
                authToken: action.payload.token,
                email: action.payload.email,
                error: null
            };
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                authToken: '',
                email: '',
                error: 403
            };
        default:
            return state;
    }
}
export default authReducer;