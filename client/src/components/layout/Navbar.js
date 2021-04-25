import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import NavbarDropdown from 'react-navbar-dropdown';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
        const guestLinks = (
        <NavbarDropdown>
            <NavbarDropdown.Toggle className="menu__item">
            <NavbarDropdown.Open>
                <i className="fas fa-bars fa-3x" />
            </NavbarDropdown.Open>
            <NavbarDropdown.Close>
                <i className="fa fa-times fa-3x" />
            </NavbarDropdown.Close>
            </NavbarDropdown.Toggle>
            <NavbarDropdown.Menu className="navmenu-menu">
                <div className="navmenu-menu__row">
                    <Link to='/about-us'>
                        <NavbarDropdown.Item className="navmenu-item">
                            <div className="navmenu-item__icon"><i className="fas fa-users" /></div>
                            <div className="navmenu-item__text">Sobre</div>
                        </NavbarDropdown.Item>
                    </Link>
                    <Link to='/concerts'>
                        <NavbarDropdown.Item className="navmenu-item">
                            <div className="navmenu-item__icon"><i className="fas fa-guitar" /></div>
                            <div className="navmenu-item__text">Conciertos</div>
                        </NavbarDropdown.Item>
                    </Link>
                </div>
                <div className="navmenu-menu__row">
                    <Link to='/impact'>
                        <NavbarDropdown.Item className="navmenu-item">
                            <div className="navmenu-item__icon"><i className="fas fa-hands-helping" /></div>
                            <div className="navmenu-item__text">Impacto</div>
                        </NavbarDropdown.Item>
                    </Link>
                </div>
                <div className="navmenu-menu__row">
                    <Link to='/contribute'>
                        <NavbarDropdown.Item className="navmenu-item">
                            <div className="navmenu-item__icon"><i className="fas fa-donate" /></div>
                            <div className="navmenu-item__text">Contribuye</div>
                        </NavbarDropdown.Item>
                    </Link>
                    <Link to='/contact'>
                        <NavbarDropdown.Item className="navmenu-item">
                            <div className="navmenu-item__icon"><i className="fas fa-envelope" /></div>
                            <div className="navmenu-item__text">Contáctanos</div>
                        </NavbarDropdown.Item>
                    </Link>
                </div>
            </NavbarDropdown.Menu>
        </NavbarDropdown>
    );

    const authLinks = (
            <NavbarDropdown>
        <NavbarDropdown.Toggle className="menu__item">
        <NavbarDropdown.Open>
            <i className="fas fa-bars fa-3x" />
        </NavbarDropdown.Open>
        <NavbarDropdown.Close>
            <i className="fa fa-times fa-3x" />
        </NavbarDropdown.Close>
        </NavbarDropdown.Toggle>
        <NavbarDropdown.Menu className="navmenu-menu">
            <div className="navmenu-menu__row">
                <Link to='/about-us'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__icon"><i className="fas fa-users" /></div>
                        <div className="navmenu-item__text">Sobre</div>
                    </NavbarDropdown.Item>
                </Link>
                <Link to='/concerts'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__icon"><i className="fas fa-guitar" /></div>
                        <div className="navmenu-item__text">Conciertos</div>
                    </NavbarDropdown.Item>
                </Link>
            </div>
            <div className="navmenu-menu__row">
                <Link to='/impact'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__icon"><i className="fas fa-hands-helping" /></div>
                        <div className="navmenu-item__text">Impacto</div>
                    </NavbarDropdown.Item>
                </Link>
            </div>
            <div className="navmenu-menu__row">
                <Link to='/contribute'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__icon"><i className="fas fa-donate" /></div>
                        <div className="navmenu-item__text">Contribuye</div>
                    </NavbarDropdown.Item>
                </Link>
                <Link to='/contact'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__icon"><i className="fas fa-envelope" /></div>
                        <div className="navmenu-item__text">Contáctanos</div>
                    </NavbarDropdown.Item>
                </Link>
            </div>
            <div className="navmenu-menu__row">
                <Link to='/dashboard'>
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__icon"><i className="fas fa-tachometer-alt" /></div>
                        <div className="navmenu-item__text">Dashboard</div>
                    </NavbarDropdown.Item>
                </Link>
                <a onClick={logout} href="#!">
                    <NavbarDropdown.Item className="navmenu-item">
                        <div className="navmenu-item__icon"><i className="fas fa-sign-out-alt" /></div>
                        <div className="navmenu-item__text">Logout</div>
                    </NavbarDropdown.Item>
                </a>
            </div>
        </NavbarDropdown.Menu>
        </NavbarDropdown>
    );

    return (
        <nav className="navmenu">
           {!loading && ( <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
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
