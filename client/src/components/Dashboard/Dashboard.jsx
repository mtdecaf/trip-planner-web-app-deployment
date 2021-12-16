import "./Dashboard.scss"
import { useState, useEffect } from "react";

import AddTripModal from "../AddTripModal/AddTripModal";
import TripCard from "../TripCard/TripCard";

const Dashboard = (props) => {
    // states that handle components displayed in mobile view
    const [dashboardDisplay, setDashboardDisplay] = useState(true);
    const [dashboardDisplayMobile, setDashboardDisplayMobile] = useState(false);

    const [sideBarDisplay, setSideBarDisplay] = useState(false);
    const [sideBarDisplayMobile, setSideBarDisplayMobile] = useState(true);

    const [addTripDisplay, setAddTripDisplay] = useState(props.addTripDisplay);

    // update the trip data on mount
    useEffect(() => {
        props.setTripData(props.tripData);
    }, [props.tripData]);
    
    const [tripData, setTripData] = useState();
    useEffect(() => {
        setTripData(props.tripData);
    }, [props.tripData]);

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
            <div className={`dashboard__content ${dashboardDisplay ? "": "dashboard__element--hidden"}`}>
                <h1 className="dashboard__title">User Dashboard</h1>
                <div className="dashboard__content-grid">
                    <div className="dashboard__card dashboard__trip-history">
                        <h2 className="dashboard__trip-history__title">Past Trips</h2>
                        <p>No Trips To Display</p>
                    </div>
                    <div className="dashboard__card dashboard__total-trips">
                        <h2 className="dashboard__total-trips__title">Total Time Traveling</h2>
                        <p>Finish A Plan To Update</p>
                    </div>
                    <div className="dashboard__card dashboard__activities">
                        <h2 className="dashboard__activities__title">Activities</h2>
                        <p>No Activities To Display</p>
                    </div>
                    <div className="dashboard__card dashboard__friends">
                        <h2 className="dashboard__friends__title">Friend List</h2>
                        <p>No Friends To Display</p>
                    </div>
                </div>
            </div>

            <div className={`dashboard__side-bar ${sideBarDisplay ? "": "dashboard__element--hidden"}`}>
                <h1 className="side-bar__title">Trips</h1>
                {/* add new tripcard */}
                <span onClick={toggleAddTrip} className="side-bar__add-new"><img src="https://img.icons8.com/ios-glyphs/30/000000/plus-2-math.png"/></span>
                {/* trip cards; map it out using the data */}
                <div className="trip-card">
                    {tripData ? tripData.map((trip, index) =>
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
            {addTripDisplay ? <AddTripModal toggleAddTrip={toggleAddTrip} username={props.username} email={props.email} setTripData={setTripData} tripData={tripData} /> : null}
        </div>
    )

}

export default Dashboard;