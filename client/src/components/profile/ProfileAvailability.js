import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileAvailability = ({
    availability: {
        to,
        from,
    }
}) => <div>
    <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ? ' Now' :
            <Moment format="YYYY/MM/DD">{to}</Moment>}
    </p>
</div>;

ProfileAvailability.propTypes = {
    availability: PropTypes.array.isRequired
}

export default ProfileAvailability
