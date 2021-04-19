import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Link as WebLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";

const Landing = ({ isAuthenticated }) => {
    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());

    if(isAuthenticated) {
       return <Redirect to='/dashboard' />
    }

    return (
        <ScrollContainer>
            <ScrollPage page={0}>
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                        <h1 className="x-large">MÚSICA PARA RESPIRAR 24/7</h1>
                        <h4>repiensa | renueva | revive</h4>
                        <i className="landing-arrow fas fa-chevron-down fa-5x" />
                    </div>
                </div>
            </section>
            </ScrollPage>

            <ScrollPage page={1}>
            <Animator animation={ZoomInScrollOut}>
                    <div style={{ fontSize: "35px" }}>
                    <h1 className="text-light">PIDE TU CONCIERTO</h1>
                    <WebLink to="/concert/request" className="btn btn-primary">AQUÍ</WebLink>
                </div>
            </Animator>
            </ScrollPage>
        </ScrollContainer>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
