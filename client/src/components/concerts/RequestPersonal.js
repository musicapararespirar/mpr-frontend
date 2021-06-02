import React, { Component, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { requestConcert } from '../../actions/concert';
import es from 'date-fns/locale/es';
import "moment/locale/es";
import Moment from 'react-moment';
import moment from 'moment';
import { getProfiles } from '../../actions/profile';
import ProfileAvailability from '../profile/ProfileAvailability';
import DatePicker from 'react-datepicker';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { getLocationFromId } from '../../actions/location';
import Toggle from 'react-toggle'

const RequestPersonal = ({
    requestConcert,
    getProfiles,
    getLocationFromId,
    location,
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
    // Returns a rounded date to the nearest half-hour
    function roundedDateTime (inDate) {
        const coeff = 1000 * 60 * 30;
        const roundedDate = new Date(Math.round(inDate / coeff) * coeff);

        return roundedDate
    };

    // Helps datepicker return a UTC time from the chosen timezone
    function datepickerUTC (e, timezone) {
        const flattime = moment(e).utc(true).format('YYYY-MM-DDTHH:mm:ss');
        const modifiedTime = moment.tz(flattime, timezone).utc().format();

        return modifiedTime;
    }

    useEffect(() => { getProfiles() }, [getProfiles]);

    // Variables for Location searching
    const [searchLocation, setSearchLocation] = useState(null);
    useEffect(() => {getLocationFromId(searchLocation)}, [searchLocation])

    // If location changes, update the time requested
    useEffect(() => {
        setFormData({ ...formData, time: {
            ...formData.time,
            dateForUTC: datepickerUTC(formData.time.dateForUTC, location.timezone) }});
    }, [location]);

    // Variable to hold time suitable for datepicker - always uses local time
    // therefore is different to what should be stored in DB
    const [timePicker, setTime] = useState(roundedDateTime(new Date()));

    const [formData, setFormData] = useState({
        requester: {
            name: '',
            number: null,
            email: '',
            isListener: true,
            timezone: location.timezoneLocal
        },
        listener: {
            name: '',
            number: null,
            email: '',
            language: '',
            timezone: location.timezoneChosen,
            placeName: location.location,
            placeLatitude: location.latitude,
            placeLongitude: location.longitude,
            isInstitution: false,
        },
        musician: {
            isPreferred: false,
            id: ''
        },
        time: {
            asap: false
        },
        message: '',
        dateFor: datepickerUTC(timePicker, location.timezone),
        type: 'personal'
    });
    const [userEntity, setUserEntity] = useState('Your');
    useEffect(() => {
        if (formData.requester.isListener) {
            setUserEntity('Your');
        } else {
            setUserEntity('Their');
        }
    }, [formData.requester.isListener]);

    useEffect(() => {
        setFormData({
            ...formData,
            listener: {
                ...formData.listener,
                timezone: location.timezone
            }})
    }, [location]);

    const [toggle, setToggle] = useState(false);
    const triggerToggle = () => {
        setToggle( !toggle )
    }
     useEffect(() => {
         setFormData({
             ...formData,
             time: {
                 ...formData.time,
                 dateFor: datepickerUTC(timePicker, formData.listener.timezone)
            }})
    }, [formData.listener.timezone]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onChangeListener = e => setFormData({
        ...formData, listener: {
            ...formData.listener,
            [e.target.name]: e.target.value }});
    const onChangeRequester = e => setFormData({
        ...formData, requester: {
            ...formData.requester,
            [e.target.name]: e.target.value
        }});
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
                    <p>Will this concert be:<br/></p>
                    <input type="radio" name="requester.isListener"
                        onChange={e => {
                            setFormData({
                                ...formData,
                                requester: {
                                    ...formData.requester,
                                    isListener: true
                                }
                            });
                        }} checked={formData.requester.isListener}/>
                    <label for={true}>For you, or</label><br/>

                    <input type="radio" name="requester.isListener"
                        onChange={e => {
                            setFormData({
                                ...formData,
                                requester: {
                                    ...formData.requester,
                                    isListener: false
                                }
                            });
                        }} checked={!formData.requester.isListener}/>
                    <label for={false}>For someone else</label><br/>
                </div>

                <div className="form-group">
                    <input type="text"
                    placeholder={`* Your name`}
                    name="name"
                    value={formData.requester.name}
                    onChange={e => onChangeRequester(e)}
                    required />
                </div>

                    <input
                    type="text"
                    placeholder="* Your email"
                    name="email"
                    value={formData.requester.email}
                    onChange={e => onChangeRequester(e)}
                    required />
                <small className="form-text">Should we need to contact you</small>

                    <input
                    type="text"
                    placeholder={`* ${userEntity} number`}
                    name="number"
                    value={formData.requester.number}
                    onChange={e => onChangeRequester(e)}
                    required />
                    <small className="form-text">Where we should send {`${userEntity.toLowerCase()}`} concert (Whatsapp)</small>

                {!formData.requester.isListener? (
                <Fragment>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="* Their name"
                    name="name"
                    value={formData.listener.name}
                    onChange={e => onChangeListener(e)}
                    required />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Message for them (Optional)"
                    name="message"
                    value={formData.message}
                    onChange={e => onChange(e)}/>
                </div>
                </Fragment>

                ) : (null)}

                    <GooglePlacesAutocomplete
                    apiKey="AIzaSyAL44Nx7XNZVHgRQd0dugCD8zvw8CJYRc8"
                    minLengthAutocomplete="3"
                    withSessionToken={true}
                    selectProps={{
                        searchLocation,
                        onChange: setSearchLocation,
                        placeholder: `* ${userEntity} city`,
                        styles: {
                            container: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                                width: '18.5rem'
                            }),
                            group: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                            }),
                            input: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                            }),
                            option: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                            }),

                    }}}
                    />
                    <small className="form-text">
                        This helps us determine {`${userEntity.toLowerCase()}`} timezone
                    </small>
                <p className="lead">Customise {`${userEntity.toLowerCase()}`} booking</p>
                    <p>We will schedule your request as soon as possible.</p>
                    <p>If you have a musician or time request, let us know</p><br/>

                <input
                    type="checkbox"
                    name="preferredMusician"
                    checked={formData.musician.isPreferred}
                    onChange={e => {console.log("what??");
                        setFormData({
                            ...formData,
                            musician: {
                                isPreferred: !formData.musician.isPreferred
                            } });
                    }} /> {' '}Request specific musician

                {formData.musician.isPreferred ? (
                <select name="preferredMusicianName"
                        contentEditable={false}
                        onChange={e => {
                        setFormData({
                            ...formData,
                            musician: {
                                ...formData.musician,
                                id: e.target.value
                            } });
                            }}>
                        <option>Choose Musician</option>
                        {profiles.map(profile => (
                            <Fragment>
                                <option value={profile._id}>{profile.user.name}</option>
                            </Fragment>))}
                </select>
                ) : (null) }
                {formData.musician.isPreferred ? (profiles.map(profile =>
                    profile.availability.map(
                        avail => (profile._id === formData.musician.id ? (
                            <Fragment><ProfileAvailability key={avail._id} availability={avail} /></Fragment>
                        ) : (
                            <Fragment></Fragment>
                        ))))) : (null)}
                <p>
                    <input
                    type="checkbox"
                    name="preferredTime"
                    checked={formData.time.asap}
                    onChange={e => {
                        setFormData({
                            ...formData,
                            time: {
                                ...formData.time,
                                asap: !formData.time.asap
                            } });
                    }} /> {' '}Request specific time
                </p>
                {formData.time.asap ? (
                <div className="form-group">
                    <h4>Time requested</h4>
                    <DatePicker
                              selected={timePicker}
                              locale={es}
                              inline
                              showTimeSelect
                              onChange={e => {
                                  setTime(e);
                                  setFormData({ ...formData, dateFor: datepickerUTC(e, formData.listener.timezone)});
                              }}/>
                </div>) : (null)}

                <Fragment><input type="submit" value="Request!" className="btn btn-primary my-1" />
                <Link to="/" className="btn btn-light my-1" >Go Back</Link></Fragment>
            </form>
    </Fragment>
}

RequestPersonal.propTypes = {
    requestConcert: PropTypes.func.isRequired,
    getProfiles: PropTypes.func.isRequired,
    getLocationFromId: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    concert: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    concert: state.concert,
    location: state.location
});


export default connect(mapStateToProps, { requestConcert, getProfiles, getLocationFromId })(RequestPersonal);
