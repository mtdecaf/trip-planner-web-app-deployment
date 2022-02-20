import "./HomePage.scss"

import Dashboard from "../../components/Dashboard/Dashboard"
import Landing from "../../components/Landing/Landing"

const HomePage = (props) => {
    if (props.isAuthenticated) {
        return (
            <Dashboard isAuthenticated={props.isAuthenticated} username={props.username} email={props.email} tripData={props.tripData} setTripData={props.setTripData} addTripDisplay={props.addTripDisplay} />
        )
    } else {
        return (
            <Landing isAuthenticated={props.isAuthenticated}/> 
        )
    }
}

export default HomePage;