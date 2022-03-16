import "../App.scss";
import "../styles/global.scss";
import PageNav from "../components/PageNav/PageNav";
import { Provider } from "react-redux";
import store from "../state/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PageNav />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
