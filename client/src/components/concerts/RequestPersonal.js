import React, { Component, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { requestConcert } from '../../actions/concert';
import momentTZ from 'moment-timezone';
import "moment/locale/es";
import Moment from 'react-moment';
import moment from 'moment';
import es from 'date-fns/locale/es';
import { getProfiles } from '../../actions/profile';
import ProfileAvailability from '../profile/ProfileAvailability';
import { zonedTimeToUtc, utcToZonedTime, format } from 'date-fns-tz';
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { useStaticState, ClockView, Calendar } from "@material-ui/pickers";
import { Paper, Button } from "@material-ui/core";
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
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
        requestType: '',
        preferredMusician: false,
        preferredMusicianName: '',
        listenerMessage: '',
        listenerName: '',
        listenerTimezone: defaultTimeZone,
        listenerNumber: '',
        asap: false,
        dateFor: roundedDateTime(moment()),
        type: 'personal'
    });

    const {
        requesterName,
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

    const [musicianNameEnabled, toggleMusician] = useState(true);
    const [timePicker, setTime] = useState(new Date(moment(dateFor)));
    const [profileObject, setProfileObject] = useState('');
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

        const [value, handleDateChange] = useState(new Date());

        // you can past mostly all available props, like minDate, maxDate, autoOk and so on
        const { pickerProps, wrapperProps } = useStaticState({
        value,
        onChange: handleDateChange,
        });

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

                <div className="form-group">
                    <h4>Time requested in {listenerTimezone}</h4>
                              <ScopedCssBaseline className='container'>
                        <Calendar {...pickerProps} />
                        <ClockView
                        type="hours"
                        date={value}
                        ampm={false}
                        onMinutesChange={() => {}}
                        onSecondsChange={() => {}}
                        onHourChange={date => handleDateChange(date)}
                        /></ScopedCssBaseline>
                </div>

                <b>You:</b> Selected time in {defaultTimeZone}: <Moment tz={defaultTimeZone} format="LLLL">{dateFor}</Moment><br/>
                <b>Them:</b>  Selected time in {listenerTimezone}: <Moment tz={listenerTimezone} format="LLLL">{dateFor}</Moment><br/>

                <div className="form-group">
                </div>

                <div className="form-group">
                    <input type="radio" id="gift" name="requestType"
                        value="gift" onChange={e => onChange(e)}/>
                    <label for="gift">Gift</label><br/>

                    <input type="radio" id="personal" name="requestType"
                        value="personal" onChange={e => onChange(e)}/>
                    <label for="personal">Personal</label><br/>

                    <input type="radio" id="other" name="requestType"
                        value="other" onChange={e => onChange(e)}/>
                    <label for="other">Other</label><br/>
                </div>
                <p><input type="checkbox" name="preferredMusician" checked={preferredMusician} value={preferredMusician} onChange={e => {
                    setFormData({ ...formData, preferredMusician: !preferredMusician });
                    toggleMusician(!musicianNameEnabled);
                }} /> {' '}Request specific musician</p>
                <div className="form-group">

                <select name="preferredMusicianName"
                        contentEditable={false}
                        onChange={ e => {
                            onChange(e);
                        } }
                        disabled={musicianNameEnabled ? 'disabled' : ''}
                        >
                        <option value="" selected disabled hidden>Choose Musician</option>
                        {profiles.map(profile => (
                            <Fragment>
                                <option value={profile._id}>{profile.user.name}</option>
                            </Fragment>))}
                </select>
                {profiles.map(profile =>
                    profile.availability.map(
                        avail => (profile._id === preferredMusicianName ? (
                            <ProfileAvailability key={avail._id} availability={avail} />) : (<Fragment></Fragment>))))}

                </div>
                <div className="form-group">
                    <input type="text" placeholder="Message for listener" name="listenerMessage" value={listenerMessage} onChange={e => onChange(e)} required />
                </div>

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
