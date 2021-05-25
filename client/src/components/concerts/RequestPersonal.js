import React, { Component, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { requestConcert } from '../../actions/concert';
import momentTZ from 'moment-timezone';
import es from 'date-fns/locale/es';
import "moment/locale/es";
import Moment from 'react-moment';
import moment from 'moment';
import { getProfiles } from '../../actions/profile';
import ProfileAvailability from '../profile/ProfileAvailability';
import TimezoneSelect, { i18nTimezones } from 'react-timezone-select'
import DatePicker from 'react-datepicker';


const RequestPersonal = ({
    requestConcert,
    getProfiles,
    profile: {
        profiles,
        loading
    },
    concert: {
        request,
        concert,
        error
    }
}) => {
    useEffect(() => {
        getProfiles();
        }, [getProfiles]);

    function roundedDateTime (inDate) {
        const coeff = 1000 * 60 * 30;
        const roundedDate = new Date(Math.round(inDate / coeff) * coeff);

        return roundedDate;
    }

    const [musicianNameEnabled, toggleMusician] = useState(true);
    const [timePicker, setTime] = useState(roundedDateTime(new Date()));
    const [profileObject, setProfileObject] = useState('');
    const defaultTimeZone = momentTZ.tz.guess();
    const timeZonesList = momentTZ.tz.names();


    function roundedDateTime (inDate) {
            // Returns a rounded date to the nearest half-hour
            const coeff = 1000 * 60 * 30;
            const roundedDate = new Date(Math.round(inDate / coeff) * coeff);

            return roundedDate
        };

    const [formData, setFormData] = useState({
        requesterName: '',
        requesterNumber: '',
        requesterEmail: '',
        requestType: 'personal',
        preferredMusician: false,
        preferredMusicianName: '',
        listenerMessage: '',
        listenerName: '',
        listenerTimezone: defaultTimeZone,
        listenerNumber: '',
        asap: false,
        dateFor: moment(timePicker).utc(true).format(),
        type: 'personal'
    });

    const {
        requesterName,
        requesterNumber,
        requesterEmail,
        requestType,
        preferredMusician,
        preferredMusicianName,
        listenerMessage,
        listenerName,
        listenerTimezone,
        listenerNumber,
        asap,
        dateFor,
        type
         } = formData;

    const [selectedTimezone, setSelectedTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    if(request !== null && request._id !== null) {
        return <Redirect to={`/request/response/${request._id}`} />
    }
    return     <Fragment>
        <Link to='/' className='btn'>
            Back home
        </Link>
        <h1 className="large text-primary">
            Request personal concert
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
                    <input type="text" placeholder="* Your number" name="requesterNumber" value={requesterNumber} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Your email" name="requesterEmail" value={requesterEmail} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="radio" id="personal" name="requestType"
                        value="personal" onChange={e => onChange(e)} checked={requestType==='personal'}/>
                    <label for="personal">For me</label><br/>

                    <input type="radio" id="gift" name="requestType"
                        value="gift" onChange={e => onChange(e)}/>
                    <label for="gift">For someone else</label><br/>
                </div>

                {requestType === 'gift' ? (
                <Fragment><div className="form-group">
                    <input type="text" placeholder="* Their name" name="listenerName" value={listenerName} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Their number" name="listenerNumber" value={listenerNumber} onChange={e => onChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Message for listener" name="listenerMessage" value={listenerMessage} onChange={e => onChange(e)} required />
                </div>
                </Fragment>

                ) : (null)}

                <p>
                    <input type="checkbox" name="preferredMusician" checked={preferredMusician} value={preferredMusician} onChange={e => {
                        setFormData({ ...formData, preferredMusician: !preferredMusician });
                        toggleMusician(!musicianNameEnabled);
                    }} /> {' '}Request specific musician
                </p>
                <div className="form-group">
                {musicianNameEnabled ? (null) : (
                <select name="preferredMusicianName"
                        contentEditable={false}
                        value={preferredMusicianName}
                        onChange={ e => { onChange(e) }}
                        disabled={musicianNameEnabled ? 'disabled' : ''}>
                        <option value="" selected disabled hidden>Choose Musician</option>
                        {profiles.map(profile => (
                            <Fragment>
                                <option value={profile._id}>{profile.user.name}</option>
                            </Fragment>))}
                </select>
                )}
                {musicianNameEnabled ? (null) : (profiles.map(profile =>
                    profile.availability.map(
                        avail => (profile._id === preferredMusicianName ? (
                            <Fragment><ProfileAvailability key={avail._id} availability={avail} /></Fragment>) : (<Fragment></Fragment>)))))}
                </div>
                <div className="form-group textarea">
                <h4>Timezone</h4>
                    <select name="listenerTimezone"
                     value={listenerTimezone}
                     contentEditable={false}
                     onChange={ e => {
                         onChange(e);
                    }}
                     >
                        {timeZonesList.map(e => (<Fragment><option value={e}>{e}</option></Fragment>))}
                    </select>
                </div>
                {console.log(selectedTimezone)}
                <div className="form-group">
                    <h4>Time requested</h4>
                    <DatePicker
                              selected={timePicker}
                              locale={es}
                              inline
                              showTimeSelect
                              onChange={e => {
                                  setTime(e);
                                  setFormData({ ...formData,
                                      dateFor: moment(e, listenerTimezone).utc(true).format()});
                              }}/>
                </div>
                {moment(dateFor).tz(listenerTimezone).format("LLLL")}<br/>
                {dateFor}<br/>
                <input type="submit" className="btn btn-primary my-1" />
                <Link to="/" className="btn btn-light my-1">Go Back</Link>
            </form>
    </Fragment>


}
RequestPersonal.propTypes = {
    requestConcert: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    concert: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    concert: state.concert
});


export default connect(mapStateToProps, { requestConcert, getProfiles })(RequestPersonal);
