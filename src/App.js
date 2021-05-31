import React from 'react';
import './App.css';
import Home from './pages/Home/home'
import Login from './pages/Login/login'
import User from './pages/User/user'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const NoMatchPage = () => {
    return (
      <h3>404 - Not found</h3>
    );
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/user" component={User} />
          <Route component={NoMatchPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
