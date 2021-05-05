import Reach, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAvailability } from '../../actions/profile';


const AddAvailability = ({ addAvailability, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <Fragment>
            <h2 className="my-2">Add availability</h2>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add the times that you are available for Musica Para Respirar
            </p>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                addAvailability(formData, history);
            }}>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddAvailability.propTypes = {
    addAvailability: PropTypes.func.isRequired
}

export default connect(null, { addAvailability })(withRouter(AddAvailability));
