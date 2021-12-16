import "./HomePage.scss"

import Dashboard from "../../components/Dashboard/Dashboard"
import Landing from "../../components/Landing/Landing"

const HomePage = (props) => {
    // console.log(props)
    if (props.isLoggedIn) {
        return (
            <Dashboard isLoggedIn={props.isLoggedIn} username={props.username} email={props.email} tripData={props.tripData} setTripData={props.setTripData} addTripDisplay={props.addTripDisplay} />
        )
    } else {
        return (
            <Landing isLoggedIn={props.isLoggedIn}/> 
        )
    }
}

export default HomePage;