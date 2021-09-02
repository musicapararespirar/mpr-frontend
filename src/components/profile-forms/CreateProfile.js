import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';


const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        location: '',
        status: '',
    });

const {
    location,
    status,
} = formData;

const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
}
    return (
        <Fragment>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information about you
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <select name="status" value={status} onChange={e => onChange(e)}>
                    <option value="0">* Select Status</option>
                    <option value="Musician">Musician</option>
                    <option value="Organiser">Organiser</option>
                </select>
                <small className="form-text"
                    >Who are you in this project?</small>
                </div>

                <div className="form-group">
                <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
                <small className="form-text"
                    >City & country suggested (eg. La Paz, Bolivia)</small
                >
                </div>

                <input type="submit" value="Submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="dashboard.html">Go Back</Link>
            </form>
        </Fragment>
    )
}

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}

export default connect(null, { createProfile })(withRouter(CreateProfile));
