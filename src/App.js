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
    useEffect(() => {
        return (
        <div className="application">
            <Helmet>
                <script async defer data-website-id="8fb3419d-bc6d-4c1b-85a1-36d5d6ab60d4" src="https://umami.evanjt.com/umami.js"></script>
            </Helmet>
        </div>
        )
        const script = document.createElement('script');
        script.src = "https://umami.evanjt.com/umami.js";
        script.async = true;
        script.defer = true;
        script["data-website-id"] = "8fb3419d-bc6d-4c1b-85a1-36d5d6ab60d4";
        console.log(script);
        const websiteId = "8fb3419d-bc6d-4c1b-85a1-36d5d6ab60d4";
        const dataDomain = "localhost";

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }

    }, []);
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

