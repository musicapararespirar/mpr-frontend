import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Concerts from './Concerts';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getConcerts } from '../../actions/concert';

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    getConcerts,
    concert: { concerts },
    auth: { user },
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
    <i className="fas fa-user"></i> Welcome { user && user.name }</p>


        <Fragment>
            {/*<DashboardActions />*/}
            {/*<Experience experience={profile.experience} />*/}
            {/*<Education education={profile.education} />*/}
            <Concerts concertList={concerts}/>
            {/*<div className="my-2">
                <button className="btn btn-danger" onClick={() => deleteAccount()}>
                    <i className="fas fa-user-minus"></i> Delete My Account
                </button>
            </div>*/}
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
