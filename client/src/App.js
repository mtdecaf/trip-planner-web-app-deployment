// import './App.scss';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import PageNav from './components/PageNav/PageNav';
import HomePage from './pages/home/Home';
import PlannerPage from './pages/PlannerPage/PlannerPage';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/login/LogIn';

import store from './state/store';
import { authendicate } from "./state/features/auth";
import { retrieveTrip } from './state/features/trip';
import { useSelector } from "react-redux";

function App() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const username = useSelector(state => state.auth.username);
    const authError = useSelector(state => state.auth.error);

    // add trip display state
    const [addTripDisplay] = useState(false);

    // when the page loads, validate that the jwt token from local storage is valid, if it is, set the state to logged in, if not, set the state to logged out
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        const authHeader = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        if (token) {
            // dispatch authendicate action and then check if the user is authenticated
            store.dispatch(authendicate(authHeader));
            store.dispatch(retrieveTrip(authHeader));
        }
    }, [token]);
    
    useEffect(() => {
        if (authError === 403) {
            sessionStorage.removeItem("token");
        }
    }, [authError]);

    return (
        <div className="App">
            <PageNav isAuthenticated={isAuthenticated} username={username} />
            <Routes>
                <Route path="/" element={<HomePage 
                    isAuthenticated={isAuthenticated}
                    addTripDisplay={addTripDisplay} />} 
                />
                <Route path="/planner/:tripId" element={ <PlannerPage 
                    isAuthenticated={isAuthenticated} />} 
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
            </Routes>
        </div>
    );
}

export default App;
