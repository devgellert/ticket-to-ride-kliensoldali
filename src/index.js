import React from "react";
import ReactDOM from "react-dom";
//
import App from "./App";
import "./index.css";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./redux/reducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { socketRoomId, socket, MESSAGES } from "./SocketContext";

const afterStateManipulationMw = (store) => (next) => (action) => {
  if (action.disableSync === true) {
    return next(action);
  }
  const result = next(action);

  if (!socket || !socketRoomId) return;
  store.dispatch(async () => {
    socket.emit(
      MESSAGES.SYNC_STATE,
      socketRoomId,
      store.getState(),
      true,
      (args) => {
        console.log("state sync message sent..", args);
      }
    );
  });
};

const composed = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(
      applyMiddleware(thunk, afterStateManipulationMw),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : applyMiddleware(thunk, afterStateManipulationMw);

const store = createStore(reducer, composed);

const providedApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(providedApp, document.getElementById("root"));
