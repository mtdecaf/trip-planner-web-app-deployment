import Dashboard from "../../components/Dashboard/Dashboard";
import Landing from "../../components/Landing/Landing";
import { useSelector } from "react-redux";

const Home = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authError = useSelector((state) => state.auth.error);
  return isAuthenticated ? (
    <Dashboard addTripDisplay={props.addTripDisplay}/>
  ) : (
    <Landing />
  );
};

export default Home;
