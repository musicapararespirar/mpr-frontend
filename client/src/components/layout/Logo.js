import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from '../../img/logo2.png';

const Logo = ({ auth: { isAuthenticated, loading }, logout }) => {
    const history = useHistory();
    return (
        <nav className="logo">
            <div onClick={e => {
                history.push('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
                <img src={logo} alt="Logo" />
            </div>
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
