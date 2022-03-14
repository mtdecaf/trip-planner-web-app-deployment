import "../App.css";
import { Provider } from "react-redux";
import store from "../state/store";
// import { AppProps } from "next/app";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
