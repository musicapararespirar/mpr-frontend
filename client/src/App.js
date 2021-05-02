// import logo from './logo.svg';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Logo from './components/layout/Logo';
import Landing from './components/layout/Landing';
// import Register from './components/auth/Register';
import AboutUs from './components/information/AboutUs';
import Concerts from './components/information/Concerts';
import Contact from './components/information/Contact';
import Contribute from './components/information/Contribute';
import Impact from './components/information/Impact';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import IndividualConcert from './components/concerts/IndividualConcert';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import RequestPersonal from './components/concerts/RequestPersonal';
import RequestInstitution from './components/concerts/RequestInstitution';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import { loadUser } from './actions/auth';
// Redux imports
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';


if(localStorage.token) {
    setAuthToken(localStorage.token)
}

const App = () => {
    // Use effect is a constant loop unless there's []
    // With [] it's like a React component-did-mount
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
    <Provider store={store}>
    <Router>
    <Fragment>
        <Logo />
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/about-us" component={AboutUs} />
                {/*<Route exact path="/register" component={Register} />*/}
                <Route exact path="/login" component={Login} />
                {/*<Route exact path="/profile/:id" component={Profile} />*/}
                {/*<Route exact path="/profiles" component={Profiles} />*/}
                <Route exact path="/concerts" component={Concerts} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/contribute" component={Contribute} />
                <Route exact path="/impact" component={Impact} />
                <Route exact path="/request/personal" component={RequestPersonal} />
                <Route exact path="/request/institution" component={RequestInstitution} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/concerts/:id" component={IndividualConcert} />
                {/*<PrivateRoute exact path="/create-profile" component={CreateProfile} />*/}
                {/*<PrivateRoute exact path="/edit-profile" component={EditProfile} />*/}
                {/*<PrivateRoute exact path="/add-experience" component={AddExperience} />*/}
                {/*<PrivateRoute exact path="/add-education" component={AddEducation} />*/}
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/posts/:id" component={Post} />
            </Switch>
        </section>
        </Fragment>
    </Router>
    </Provider>
)};
export default App;
