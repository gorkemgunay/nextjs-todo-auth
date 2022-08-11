import { Provider } from "react-redux";
import "../../styles/globals.css";
import store from "../store";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, ...pageProps }) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" reverseOrder={false} />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
