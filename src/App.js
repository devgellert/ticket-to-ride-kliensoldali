import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GamePage from "./components/game_page/GamePage";
import MainPage from "./components/MainPage";
import WaitingPage from "./components/WaitingPage";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={GamePage} />
          <Route path="/main" component={MainPage} />
          <Route path="/waiting" component={WaitingPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
