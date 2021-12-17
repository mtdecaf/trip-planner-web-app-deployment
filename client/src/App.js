import './App.css';
import { Switch, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";

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
    const [addTripDisplay, setAddTripDisplay] = useState(false);

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
                } else {
                    setIsLoggedIn(false);
                }
            })
            .catch(err => {
                setIsLoggedIn(false);
            })
            // get the trip data from the server
            // pass the user email to the server
            axios.get("/gettrip", config)
            .then(res => {
                setTripData(res.data);
            })
        } else {
        }
        // repeat every time username, email, or trip data changes
    }, [username, email, tripData.length]);
    return (
        <div className="App">
            <PageNav isLoggedIn={isLoggedIn} username={username} />
            <Switch>
                <Route exact path="/" render={() => <HomePage isLoggedIn={isLoggedIn} username={username} email={email} tripData={tripData} setTripData={setTripData} addTripDisplay={addTripDisplay} />} />
                <Route path="/planner/:tripId" render={() => <PlannerPage isLoggedIn={isLoggedIn} username={username} email={email} tripData={tripData} />} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={LogIn} />
            </Switch>
        </div>
    );
}

export default App;
