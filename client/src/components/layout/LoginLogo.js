import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LoginLogo = () => {
    return (
        <nav className="bottomright">
            <Link to="/login">
                <i className="far fa-lemon logo-login " />
            </Link>
        </nav>
    )
}

export default connect()(LoginLogo);
