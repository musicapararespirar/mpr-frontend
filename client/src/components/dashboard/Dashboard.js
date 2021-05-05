import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Availability from './Availability';
import AddAvailability from '../profile-forms/AddAvailability';
import ConcertList from '../concerts/ConcertList';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getConcerts } from '../../actions/concert';
import MainCalendar from '../calendar/MainCalendar';

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    getConcerts,
    concert: { concerts },
    auth,
    profile: {
        profile,
        loading
    }}) => {
        useEffect(() => {
            getCurrentProfile();
            getConcerts();
    }, [getCurrentProfile, getConcerts]);

    return loading && profile === null ? <Spinner /> : <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
        <i className="fas fa-user"></i> Welcome { auth.user && auth.user.name }
        {auth.isAuthenticated && loading === false && profile !== null &&
            auth.user._id === profile.user._id && (
            <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
            </Link>
            )} {profile === null && (<Link to='create-profile' className="btn btn-primary my-1">Create Profile</Link>)}</p>

        <Fragment>
            <MainCalendar />
            <ConcertList concertList={concerts}/>
            {profile !== null ? (
                <Availability availability={profile.availability} />

            ) : (
                <Fragment>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to='create-profile' className="btn btn-primary my-1">Create Profile</Link>
                </Fragment>
            )}
            <AddAvailability />
        </Fragment>
    </Fragment>;
    }

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getConcerts: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    concert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    concert: state.concert
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, getConcerts } )(Dashboard);
