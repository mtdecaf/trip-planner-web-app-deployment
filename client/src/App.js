import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import PageNav from './components/PageNav/PageNav';
import HomePage from './pages/HomePage/HomePage';
import PlannerPage from './pages/PlannerPage/PlannerPage';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';

import store from './state/store';
import { authendicate } from "./state/features/auth";
import { useSelector } from "react-redux";

function App() {
    const state = useSelector(state => state);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const username = useSelector(state => state.auth.username);

    // trip info state
    const [tripData, setTripData] = useState();

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
            store.dispatch(authendicate(authHeader));
        }
    }, [token]);

    return (
        <div className="App">
            <PageNav isAuthenticated={isAuthenticated} username={username} />
            <Routes>
                <Route path="/" element={<HomePage 
                    isAuthenticated={isAuthenticated}
                    tripData={tripData} 
                    setTripData={setTripData} 
                    addTripDisplay={addTripDisplay} />} 
                />
                <Route path="/planner/:tripId" element={ <PlannerPage 
                    isAuthenticated={isAuthenticated} 
                    tripData={tripData} 
                    setTripData={setTripData} />} 
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn />} />
            </Routes>
        </div>
    );
}

export default App;
