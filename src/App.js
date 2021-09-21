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
            <script async defer data-website-id="a59d1fa2-ade3-4f34-8417-5fdb271798a5" src="https://stats.musicapararespirar.com/umami.js"></script>
            <script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/18e4b7f031750b28dbf9ff1a5/fc094b98098cbc6dd68d7ab3f.js");</script>
            <link rel="canonical" href="https://musicapararespirar.com" />
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

