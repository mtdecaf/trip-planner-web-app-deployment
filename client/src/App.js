import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../src/middleware/axiosConfig.js";

import PageNav from './components/PageNav/PageNav';
import HomePage from './pages/HomePage/HomePage';
import PlannerPage from './pages/PlannerPage/PlannerPage';
import SignUp from './pages/SignUp/SignUp';
import LogIn from './pages/LogIn/LogIn';

function App() {
    // user info state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");

    // trip info state
    const [tripData, setTripData] = useState([]);

    // add trip display state
    const [addTripDisplay] = useState(false);

    // when the page loads, validate that the jwt token from local storage is valid, if it is, set the state to logged in, if not, set the state to logged out
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        document.title = "On The Road";
        if (token) {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            // if the token is valid, set the state to logged in
            axios.get("/welcome", config)
            .then(res => {
                if (res.status === 200) {
                    setIsLoggedIn(true);
                    setUserName(res.data.username);
                    setEmail(res.data.email);
                }
            })
            .catch(err => {
                setIsLoggedIn(false);
                sessionStorage.removeItem("token");
            })
            // get the trip data from the server
            axios.get("/gettrip", config)
            .then(res => {
                setTripData(res.data);
            })
            .catch(err => {
                sessionStorage.removeItem("token");
            })
        }
    }, [token]);

    return (
        <div className="App">
            <PageNav isLoggedIn={isLoggedIn} username={username} />
            <Routes>
                <Route path="/" element={<HomePage isLoggedIn={isLoggedIn}
                    username={username} 
                    email={email} 
                    tripData={tripData} 
                    setTripData={setTripData} 
                    addTripDisplay={addTripDisplay} />} 
                />
                <Route path="/planner/:tripId" element={ <PlannerPage 
                    isLoggedIn={isLoggedIn} 
                    username={username} 
                    email={email} 
                    tripData={tripData} 
                    setTripData={setTripData} />} 
                />
                <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/login" element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
        </div>
    );
}

export default App;
