import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileAvailability = ({
    availability: {
        dateTo,
        dateFrom,
    }
}) => <div>
    <p><h4>Times</h4>
        <Moment format="YYYY/MM/DD LT">{dateFrom}</Moment> - {<Moment format="YYYY/MM/DD LT">{dateTo}</Moment>}
    </p>
</div>;

ProfileAvailability.propTypes = {
    availability: PropTypes.array.isRequired
}

export default ProfileAvailability
