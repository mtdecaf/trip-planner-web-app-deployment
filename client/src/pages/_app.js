import "../styles/global.scss";
import Layout from "../components/layout.jsx";
import { Provider } from "react-redux";
import store from "../state/store";

import { useEffect } from "react";

import { authendicate } from "../state/features/auth";
import { retrieveTrip } from "../state/features/trip";

function MyApp({ Component, pageProps }) {
  const ISSERVER = typeof window === "undefined";
  //   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  //   const username = useSelector((state) => state.auth.username);
  //   const authError = useSelector((state) => state.auth.error);

  // when the page loads, validate that the jwt token from local storage is valid, if it is, set the state to logged in, if not, set the state to logged out
  const token = !ISSERVER && sessionStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (token) {
      // dispatch authendicate action and then check if the user is authenticated
      store.dispatch(authendicate(authHeader));
      store.dispatch(retrieveTrip(authHeader));
    }
  }, [token]);
  // useEffect(() => {
  //   if (authError === 403) {
  //     sessionStorage.removeItem("token");
  //   }
  // }, [authError]);
  return (
    <>

      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
