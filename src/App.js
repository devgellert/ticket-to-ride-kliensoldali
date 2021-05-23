import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GamePage from "./components/game_page/GamePage";
import MainPage from "./components/MainPage";
import WaitingPage from "./components/WaitingPage";
import FinalTable from "./components/final_table/FinalTable";
import { SocketContextProvider } from "./SocketContext";

const App = () => {
  return (
    <div>
      <Router>
        <SocketContextProvider>
          <Switch>
            <Route path="/main" component={MainPage} />
            <Route path="/waiting" component={WaitingPage} />
            <Route path="/" component={GamePage} />
          </Switch>
          <Route path="/final" component={FinalTable} />
        </SocketContextProvider>
      </Router>
    </div>
  );
};

export default App;
