import Dashboard from "../../components/Dashboard/Dashboard"
import Landing from "../../components/Landing/Landing"

const HomePage = (props) => {
    return (
        props.isAuthenticated ? <Dashboard addTripDisplay={props.addTripDisplay} /> : <Landing />
    )
}

export default HomePage;