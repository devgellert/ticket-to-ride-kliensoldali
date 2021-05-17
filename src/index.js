import React from "react";
import ReactDOM from "react-dom";
import { SocketContextProvider } from "./SocketContext";
//
import App from "./App";
import "./index.css";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./redux/reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const providedApp = (
  <Provider store={store}>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </Provider>
);

ReactDOM.render(providedApp, document.getElementById("root"));
