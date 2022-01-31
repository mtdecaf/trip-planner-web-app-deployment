import "./Dashboard.scss"
import { useState, useEffect } from "react";
import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';

import axios from "../../middleware/axiosConfig";

// imported components
import AddTripModal from "../AddTripModal/AddTripModal";
import TripCard from "../TripCard/TripCard";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const Dashboard = (props) => {
    const [mapApiToken, setMapApiToken] = useState();
    // states that handle components displayed in mobile view
    const [dashboardDisplay, setDashboardDisplay] = useState(true);
    const [dashboardDisplayMobile, setDashboardDisplayMobile] = useState(false);

    const [sideBarDisplay, setSideBarDisplay] = useState(false);
    const [sideBarDisplayMobile, setSideBarDisplayMobile] = useState(true);

    const [addTripDisplay, setAddTripDisplay] = useState(props.addTripDisplay);

    // state that handle the map viewport
    const [viewport, setViewport] = useState({
        // set width and height of map
        width: "calc(100vw - 20rem)",
        height: "calc(100vh - 4.2rem)",
        // set the initial viewport to Vancouver
        latitude: 49.2827,
        longitude: -123.1207,
        zoom: 10
      });


    // get the map token from the backend
    useEffect(() => {
        axios.get("/mapToken")
        .then(res => {
            setMapApiToken(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const toggleDisplay = () => {
        if (dashboardDisplay) {
            setDashboardDisplay(false);
            setDashboardDisplayMobile(true);
            setSideBarDisplay(true);
            setSideBarDisplayMobile(false);
        } else {
            setDashboardDisplay(true);
            setDashboardDisplayMobile(false);
            setSideBarDisplay(false);
            setSideBarDisplayMobile(true);
        }
    }

    const toggleAddTrip = () => {
        // opens the add trip modal
        if (addTripDisplay) {
            setAddTripDisplay(false);
        } else {
            setAddTripDisplay(true);
        }
    }
    

    return(
        <div className="dashboard">
            {mapApiToken ? <ReactMapGL {...viewport} onViewportChange={nextViewport => setViewport(nextViewport)} mapboxApiAccessToken={mapApiToken} />: null}

            <div className={`dashboard__side-bar ${sideBarDisplay ? "": "dashboard__element--hidden"}`}>
                <h1 className="side-bar__title">Trips</h1>
                {/* add new tripcard */}
                <span onClick={toggleAddTrip} className="side-bar__add-new"><img src="https://img.icons8.com/ios-glyphs/30/000000/plus-2-math.png" alt="add a trip button"/></span>
                {/* trip cards; map it out using the data */}
                <div className="trip-card">
                    {props.tripData ? props.tripData.map((trip, index) =>
                        <TripCard 
                        key={index} 
                        tripData={trip}
                        />
                    ) : null}
                </div>
            </div>

            <div className={`dashboard__side-bar-mobile ${sideBarDisplayMobile ? "": "dashboard__element--hidden"} dashboard__mobile-element`}>
                <h1 onClick={toggleDisplay}>Trips</h1>
            </div>
            <div className={`dashboard__content-mobile ${dashboardDisplayMobile ? "": "dashboard__element--hidden"} dashboard__mobile-element`}>
                <h1 onClick={toggleDisplay}>User Dashboard</h1>
            </div>

            {/* renders AddTripModal only if AddtripDisplay is True */}
            {addTripDisplay ? <AddTripModal 
            toggleAddTrip={toggleAddTrip} 
            username={props.username} 
            email={props.email} 
            setTripData={props.setTripData} 
            tripData={props.tripData} 
            /> : null}
        </div>
    )

}

export default Dashboard;