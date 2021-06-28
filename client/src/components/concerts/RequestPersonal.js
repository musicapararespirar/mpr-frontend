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
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

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
            id: null
        },
        time: {
            asap: true,
            dateForUTC: datepickerUTC(timePicker, location.timezone),
        },
        message: '',
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

    const [slideState, setSlideState] = useState({
        isPaneOpen: false,
        isPaneOpenLeft: false
    });
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
    <div style={{
        position: 'absolute',
        right: '-30%',
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }}>
    <div className="form" style={{
                float: 'left',
                minWidth: '30vw',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
            }}>
        <Link to='/' className='btn'>
            Back home
        </Link>
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

                    <PhoneInput
                        placeholder={`* ${userEntity} number`}
                        value={formData.requester.number}
                        onChange={e => {
                            setFormData({
                                ...formData,
                                listener: {
                                    ...formData.listener,
                                    number: e
                                }
                            });
                        }}
                    />
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
                            control: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                                height: '30px',
                                minHeight: '30px',
                                width: '18.5rem',
                                borderRadius: 50
                            }),
                            container: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                                width: '18.5rem'
                            }),
                            valueContainer: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                                height: '30px',
                                padding: '0 6px',
                                width: '18.5rem'
                            }),
                            input: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                margin: '0px',
                                width: '18.5rem',
                                padding: '2px'
                            }),
                            indicatorsContainer: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                                height: '30px',
                            }),
                            indicatorsSeparator: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                                display: 'none',
                            }),
                            option: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                                width: '18.5rem',
                            }),
                            singleValue: (provided) => ({
                                ...provided,
                                fontFamily: 'Raleway, sans-serif',
                                color: 'black',
                                width: '18.5rem',
                                margin: '3px'
                            }),

                    }}}
                    />
                    <small className="form-text">
                        This helps us determine {`${userEntity.toLowerCase()}`} timezone
                    </small>

                <Fragment><input type="submit" value="Request!" className="btn btn-primary my-1" />
                <Link to="/" className="btn btn-light my-1" >Go Back</Link>      <button    onClick={() => setSlideState({ isPaneOpen: true })}>
                    Next >
                </button></Fragment>
            </form></div>
            <div className="form" style={{
                float: 'left',
                minWidth: '30vw',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem'
            }}>
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
                    }} /> {' '}Request musician

                {formData.musician.isPreferred ? (
                <div className="form-group">
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
                        <option className="form">Choose Musician</option>
                        {profiles.map(profile => (
                            <Fragment>
                                <option value={profile._id}>{profile.user.name}</option>
                            </Fragment>))}
                    </select>
                </div>
                ) : (null) }
                {formData.musician.isPreferred ? (profiles.map(profile =>
                    profile.availability.map(
                        avail => (profile._id === formData.musician.id ? (
                            <ProfileAvailability key={avail._id} availability={avail} />
                        ) : (
                            <Fragment></Fragment>
                        ))))) : (null)}
                <p>
                    <input
                    type="checkbox"
                    name="preferredTime"
                    checked={!formData.time.asap}
                    onChange={e => {
                        setFormData({
                            ...formData,
                            time: {
                                ...formData.time,
                                asap: !formData.time.asap
                            } });
                    }} /> {' '}Request time
                </p>
                {!formData.time.asap ? (
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
            </div>
             <div className="form" style={{
                float: 'left',
                minWidth: '30vw',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem'
            }}>third pane </div></div>
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
