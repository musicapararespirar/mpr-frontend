// import logo from './logo.svg';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Logo from './components/layout/Logo';
import Landing from './components/layout/Landing';
import './App.css';
// Redux imports
import { Provider } from 'react-redux';
import store from './store';
import "@fontsource/voltaire";
import "@fontsource/josefin-sans";

const App = () => {
    return (
    <Provider store={store}>
    <Router>
    <Fragment>
        <Logo />
        <Navbar />
        <Route exact path="/" component={Landing} />
        </Fragment>
    </Router>
    </Provider>
)};

export default App;

