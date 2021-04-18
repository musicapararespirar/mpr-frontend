import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from '../../img/logo.png';

const Logo = ({ auth: { isAuthenticated, loading }, logout }) => {
    return (
        <nav className="logo">
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
        </nav>
    )
}

Logo.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Logo);
