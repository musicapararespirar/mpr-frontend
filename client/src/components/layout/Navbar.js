import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            {/*<li><Link to="/about-us">About Us</Link></li>*/}
            {/*<li><Link to="/profiles">Musicians</Link></li>*/}
            {/*<li><Link to="/about-us">Sobre</Link></li>*/}
            {/*<li><Link to="/concerts">Conciertos</Link></li>*/}
            <li><Link to="/impact">Impacto</Link></li>
            <li><Link to="/contribute">Contribuye</Link></li>
            <li><Link to="/contact">Contáctanos</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-tachometer-alt" />
                </Link>
            </li>

            <li>
                <a onClick={logout} href="#!">
                    <i className="fas fa-sign-out-alt" />{' '}
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="/about-us">Sobre</Link></li>
            <li><Link to="/concerts">Conciertos</Link></li>
            <li><Link to="/impact">Impacto</Link></li>
            <li><Link to="/contribute">Contribuye</Link></li>
            <li><Link to="/contact">Contáctanos</Link></li>
            {/*<li><Link to="/profiles">Musicians</Link></li>*/}
            {/*<li><Link to="/register">Register</Link></li>*/}
            {/*<li><Link to="/login">Login</Link></li>*/}
        </ul>
    );

    return (
        <nav className="navbar bg-light">
        {   // Change navbar state depending on whether user is auth'd
            // Can use && because there is a null after :
          !loading && (
            <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>
        ) }
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
