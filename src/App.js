import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GamePage from "./components/game_page/GamePage";
import MainPage from "./components/MainPage";
import WaitingPage from "./components/WaitingPage";
import FinalTable from "./components/final_table/FinalTable";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={GamePage} />
          <Route path="/final" component={GamePage} />
          <Route path="/main" component={MainPage} />
          <Route path="/waiting" component={WaitingPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
