import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { Register } from './_Pages/Register';
import { EditProfile } from './_Pages/EditProfile';
import { Image } from './_Pages/Image';
import { Login } from './_Pages/Login';
import { Profile } from './_Pages/Profile';
import { Home } from './_Pages/Home';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/edit_profile">
          <EditProfile />
        </Route>
        <Route path={`/image/:id`}>
          <Image />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
