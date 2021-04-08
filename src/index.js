import React from "react";
import ReactDOM from "react-dom";
//
import App from "./App";
import "./index.css";
import { createStore } from "redux";
import reducer from "./redux/reducer";
import { Provider } from "react-redux";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const providedApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(providedApp, document.getElementById("root"));
