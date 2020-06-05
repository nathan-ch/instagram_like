import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import { useSelector } from 'react-redux'
import './App.css';
import { Register } from './_Pages/Register';
import { EditProfile } from './_Pages/EditProfile';
import { Image } from './_Pages/Image';
import { Login } from './_Pages/Login';
import { Profile } from './_Pages/Profile';
import { Home } from './_Pages/Home';
import NavNav from './_Components/NavNav';


const App = () => {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)

  return (
    <Router>
      <NavNav />
      <Switch>
        <Route path="/edit_profile">
        {isAuthenticated ? <EditProfile/> : <Login />}
        </Route>
        <Route path={`/image/:id`}>
          <Image />
        </Route>
        <Route path="/login">
          {isAuthenticated ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {isAuthenticated ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/profile">
        {isAuthenticated ? <Profile/> : <Login />}
        </Route>
        <Route path="/">
          {isAuthenticated ? <Home/> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
