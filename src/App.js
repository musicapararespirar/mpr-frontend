import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Logo from './components/layout/Logo';
import Landing from './components/layout/Landing';
import './App.css';
// Redux imports
import { Provider } from 'react-redux';
import store from './store';
import "@fontsource/voltaire";
import "@fontsource/josefin-sans";
import {Helmet} from "react-helmet";

// Stub for legacy umami analytics calls (prevents errors)
window.umami = window.umami || function() {};

const App = () => {
    return (
    <Provider store={store}>
    <div className="application">
        <Helmet>
            <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "6156c1bb1d9c4b5381d9fc7d98a2f92c"}'></script>
            <link rel="canonical" href="https://musicapararespirar.com/" />
        </Helmet>
    </div>
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

