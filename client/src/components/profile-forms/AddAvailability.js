import Reach, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAvailability } from '../../actions/profile';
import momentTZ from 'moment-timezone';
import DateTime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import "moment/locale/es";
import Moment from 'react-moment';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';


const AddAvailability = ({ addAvailability, history }) => {
    const defaultTimeZone = momentTZ.tz.guess();
    const timeZonesList = momentTZ.tz.names();
    const [formData, setFormData] = useState({
        dateFrom: moment.now(),
        dateTo: moment.now(),
        personalTimezone: "America/La_Paz",
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const { school, degree, fieldofstudy, from, to, current, description, personalTimezone, dateFrom, dateTo } = formData;

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
                    <h4>Timezone</h4>
                    <select name="personalTimezone"
                     value={personalTimezone}
                     contentEditable={false}
                     disabled={true}
                     onChange={ e => onChange(e) }
                     >
                        {timeZonesList.map(e => (<Fragment><option value={e}>{e}</option></Fragment>))}
                    </select>
                </div>

                <div className="form-group">
                    <h4>Date From</h4>
                    <DatePicker
                              selected={startDate}
                              locale={es}
                              inline
                              showTimeInput
                              onChange={e => {
                                  setStartDate(e);
                                  console.log(moment.tz(e, personalTimezone));
                                  console.log(moment(e.getUTCDate()).tz(personalTimezone));
                                  setFormData({ ...formData,
                                      dateFrom: moment.tz(e, personalTimezone)});
                              }}/>
                </div>

                <div className="form-group">
                    <h4>Date To</h4>
                    <DatePicker
                              selected={endDate}
                              locale={es}
                              inline
                              showTimeInput
                              onChange={e => {
                                  setEndDate(e);
                                  console.log(moment.tz(e, personalTimezone));
                                  console.log(moment(e.getUTCDate()).tz(personalTimezone));
                                  setFormData({ ...formData,
                                      dateTo: moment.tz(e, personalTimezone)});
                              }}/>
                </div>
                {moment(dateFrom).format()}<br/>
                {moment(dateFrom).utc().format()}<br/>
                {dateFrom}<br/>

                <div>
                <table className="table">
                    <tr>
                        <th></th>
                        <th>Your time</th>
                        <th>Bolivia time</th>
                    </tr>
                    <tr>
                        <td><b>From</b></td>
                        <td><Moment tz={defaultTimeZone} format="DD/MM LT">{dateFrom}</Moment><br/></td>
                        <td><Moment tz={personalTimezone} format="DD/MM LT">{dateFrom}</Moment><br/></td>
                    </tr>
                    <tr>
                        <td><b>To</b></td>
                        <td><Moment tz={defaultTimeZone} format="DD/MM LT">{dateTo}</Moment><br/></td>
                        <td><Moment tz={personalTimezone} format="DD/MM LT">{dateTo}</Moment><br/></td>
                    </tr>
                </table>
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
