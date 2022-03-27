import Dashboard from "../../components/Dashboard/Dashboard"
import Landing from "../../components/Landing/Landing"

const Home = (props) => {
    return (
        props.isAuthenticated ? <Dashboard addTripDisplay={props.addTripDisplay} /> : <Landing />
    )
}

export default Home;