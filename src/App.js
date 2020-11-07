import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Authentication from './Authentication';
import Dash from './Dash';
import Graphs from './Graphs';
import Nav from './Nav';
import Notifications from './Notifications';
import AddNew from './components/AddNew'
import PrivateRoute from "./components/PrivateRoute";
import Store from "./store";
function App() {
  return (
    
    <div className="App">
      <Store>
      <Router>
      <Nav/>
      <Switch>
        <PrivateRoute path="/" exact component={Dash}/>
        <Route path="/auth" exact component={Authentication}/>
        <Route path="/graphs" exact component={Graphs}/>
        <Route path="/notification" exact component={Notifications}/>
        <Route path="/addnew" exact component={AddNew}/>
      </Switch>
      </Router>
      </Store>
    </div>
    
  );
}

export default App;
