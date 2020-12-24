import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Cowork from "./pages/Cowork";
import MeetingRoom from "./pages/MeetingRoom";
import History from "./constant/history";

export default function App() {
  return (
    <Router history={History}>
      <Switch>
        <Route exact path="/" component={Landing}></Route>
        <Route exact path="/coworks" component={Cowork}></Route>
        <Route exact path="/meeting_rooms" component={MeetingRoom}></Route>
      </Switch>
    </Router>
  );
}
