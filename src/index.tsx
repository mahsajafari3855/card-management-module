
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../src/store/store"; // Adjust the path as needed




import App from "./App"; // Adjust the path as needed

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
