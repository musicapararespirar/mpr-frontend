import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteAvailability } from '../../actions/profile';

const Availability = ({ availability, deleteAvailability }) => {
    const availabilities = availability.map(avail => (
        <tr key={avail._id}>
            <td>
                <Moment format='YYYY/MM/DD LT'>{avail.dateFrom}</Moment>
            </td>
            <td>
                <Moment format='YYYY/MM/DD LT'>{avail.DateTo}</Moment>
            </td>
            <td>
                <button onClick={() => deleteAvailability(avail._id)} className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">My availability</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>From</th>
                        <th>To</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{availabilities}</tbody>
            </table>
        </Fragment>
    )
}

Availability.propTypes = {
    deleteAvailability: PropTypes.func.isRequired
}

export default connect(null, { deleteAvailability })(Availability);

