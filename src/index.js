import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
// rename Provider with ReduxProvider to avoid confusion
import { Provider as ReduxProvider } from "react-redux";

// was used to test
// function Hi() {
//   return <p>Hi.</p>;
// }

const store = configureStore();

render(
  //By wrapping the whole app with ReduxProvider, it will be given access to the Redux Store
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
