import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getConcertById } from '../../actions/concert';
import Moment from 'react-moment';
import 'moment-timezone';

const IndividualConcert = ({
    getConcertById,
    concert: {
        concert,
    },
    auth,
    match
}) => {
    useEffect(() => {
        getConcertById(match.params.id);
    }, [getConcertById, match.params.id]);

    return <Fragment>
        {auth.loading || concert === null ? <Spinner /> : <Fragment>
            <Link to='/dashboard' className='btn btn-light'>Back to Dashboard</Link>

            <h1>Concert</h1>

            Requested by: {concert.requesterName}<br/>
            For: {concert.listenerName}<br />
            Reason: {concert.reason}<br />
            Musician: {concert.preferredMusicianName}<br />
            Message: {concert.listenerMessage}<br />
            Location: {concert.listenerLocation}<br />
            Number: {concert.listenerNumber}<br />
            Time: <Moment format='DD/MM h:mm:ss'>{concert.dateFor}</Moment> (<Moment fromNow>{concert.dateFor}</Moment>)
            </Fragment>
        }
    </Fragment>
};

IndividualConcert.propTypes = {
    getConcertById: PropTypes.func.isRequired,
    concert: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    concert: state.concert,
    auth: state.auth
});

export default connect(mapStateToProps, { getConcertById })(IndividualConcert);
