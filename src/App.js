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
import { registerUmamiScript } from '@parcellab/react-use-umami'
import {Helmet} from "react-helmet";


const App = () => {
    return (
    <Provider store={store}>
    <div className="application">
        <Helmet>
            <script async defer data-website-id="1528b4e1-a93d-42f8-9980-a18d949e3c6b" src="https://stats.musicapararespirar.com/umami.js"></script>
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

