import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestConcert } from '../../actions/concert';
import momentTZ from 'moment-timezone';

const RequestInstitution= ({

}) => {
    const defaultTimeZone = momentTZ.tz.guess();
    const timeZonesList = momentTZ.tz.names();
    const [formData, setFormData] = useState({
        requesterName: '',
        reason: '',
        preferredMusician: false,
        preferredMusicianName: '',
        listenerMessage: '',
        listenerName: '',
        listenerLocation: '',
        listenerNumber: '',
        asap: false,
        dateFor: '',
        type: 'institution'
    });

    const [musicianNameEnabled, toggleEnabled] = useState(true);

    const {
        requesterName,
        reason,
        preferredMusician,
        preferredMusicianName,
        listenerMessage,
        listenerName,
        listenerLocation,
        listenerNumber,
        asap,
        dateFor,
        type
         } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return <Fragment>
        <Link to='/' className='btn'>
            Back home
        </Link>
        <h1 className="large text-primary">
            Request concert for institutions
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Fill in your details below to request a concert
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => {
                e.preventDefault();
                requestConcert(formData);
            }}>
                <div className="form-group">
                    <input type="text" placeholder="* Your name" name="requesterName" value={requesterName} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="radio" id="gift" name="reason" value="gift" />
                    <label for="gift">Gift</label><br/>
                    <input type="radio" id="personal" name="reason" value="personal" />
                    <label for="personal">Personal</label><br/>
                    <input type="radio" id="other" name="reason" value="other" />
                    <label for="other">Other</label><br/>
                </div>
                <div className="form-group">
                <p><input type="checkbox" name="preferredMusician" checked={preferredMusician} value={preferredMusician} onChange={e => {
                    setFormData({ ...formData, preferredMusician: !preferredMusician });
                    toggleEnabled(!musicianNameEnabled);
                }} /> {' '}Request specific musician</p>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Musician's name" name="preferredMusicianName" value={preferredMusicianName} onChange={e => onChange(e)} disabled={musicianNameEnabled ? 'disabled' : ''}/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Message for listener" name="listenerMessage" value={listenerMessage} onChange={e => onChange(e)} required />
                </div>

                <div className="form-group">
                    <input list="timezones" placeholder="Listener's timezone" name="listenerLocation"/>
                    <datalist id='timezones' contenteditable={false}>
                        {timeZonesList.map(e => (<Fragment><option value={e} /></Fragment>))}
                    </datalist>
                </div>
                {/*<div className="form-group">
                <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                    setFormData({ ...formData, current: !current });
                    toggleDisabled(!toDateDisabled);
                }} /> {' '}Current School</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    value={description} onChange={e => onChange(e)}
                ></textarea>
                </div>*/}
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
    </Fragment>


}

export default connect()(RequestInstitution);
