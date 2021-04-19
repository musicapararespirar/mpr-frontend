import React from 'react'
import { Redirect } from 'react-router-dom';
import { Link as WebLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-scroll';


const Landing = ({ isAuthenticated }) => {

    if(isAuthenticated) {
       return <Redirect to='/dashboard' />
    }


    return (

    <section className="landing">
        <div className="dark-overlay">
            <div id="landing-inner" className="landing-inner">
            <h1 className="x-large">MÚSICA PARA RESPIRAR 24/7</h1>
            <h4>repiensa | renueva | revive</h4>
            <br/>
            <div className="landing-arrows">
                <Link to="request-concert" spy={true} smooth={true}>
                    <i className="fas fa-long-arrow-alt-down fa-7x" />
                </Link>
                <i className="p-3" />
                <i className="p-3" />
                <i className="fas fa-long-arrow-alt-down fa-7x" />
            </div>
            </div>
        </div>
        <div id='request-concert' className="landing-nav">
            <h1 className="text-dark">PIDE TU CONCIERTO</h1>
            <WebLink to="/concert/request" className="btn btn-primary">AQUÍ</WebLink>
        </div>
    </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
