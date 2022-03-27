import "../App.scss";
import "../styles/global.scss";
import Layout from "../components/layout.jsx";
import { Provider } from "react-redux";
import store from "../state/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
