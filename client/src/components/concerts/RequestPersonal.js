import React, { Component, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestConcert } from '../../actions/concert';
import momentTZ from 'moment-timezone';
import DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import "moment/locale/es";
import Moment from 'react-moment';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import { getProfiles } from '../../actions/profile';
import ProfileAvailability from '../profile/ProfileAvailability';

const RequestPersonal = ({
    requestConcert,
    getProfiles,
    profile: {
        profiles,
        loading
    },
}) => {

    useEffect(() => {
        getProfiles();
        }, [getProfiles]);

    const defaultTimeZone = momentTZ.tz.guess();
    const timeZonesList = momentTZ.tz.names();
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
        dateFor: moment.now(),
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

    return <Fragment>
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
                     onChange={ e => onChange(e) }
                     >
                        {timeZonesList.map(e => (<Fragment><option value={e}>{e}</option></Fragment>))}
                    </select>
                </div>

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
                                      dateFor: moment.tz(e, listenerTimezone).toISOString()});
                                  console.log(moment.tz(e, listenerTimezone).toISOString());
                              }}/>
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
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
    </Fragment>


}
RequestPersonal.propTypes = {
    requestConcert: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(mapStateToProps, { requestConcert, getProfiles })(RequestPersonal);
