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
    concert: {
        concerts,
        concert,
        loading: concertsLoading
    },
    auth,
    profile: {
        profile,
        loading: profileLoading
    }}) => {
        useEffect(() => {
            getCurrentProfile();
            getConcerts();
        }, [getCurrentProfile, getConcerts]);
    console.log(concerts, profileLoading, concertsLoading);
    return profileLoading || concertsLoading ? <Spinner /> :
    <Fragment>
    {console.log(profileLoading)}
            <h1 className="large text-primary">Dashboard</h1>
            <i className="fas fa-user"></i> Welcome { auth.user && auth.user.name }
            <ConcertList
                concertList={concerts}/><br/>
            <MainCalendar />

        {profile !== null ? (
                <Fragment>
                    <Link to='/edit-profile' className='btn btn-dark'>
                        Edit Profile
                    </Link>
                    <Availability availability={profile.availability} />
                    <AddAvailability />
                </Fragment>
            ) : (
                <Fragment>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to='create-profile' className="btn btn-primary my-1">Create Profile</Link>
                </Fragment>
            )}

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
