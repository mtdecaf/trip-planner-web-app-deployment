import "../App.scss";
import { Provider } from "react-redux";
import store from "../state/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
