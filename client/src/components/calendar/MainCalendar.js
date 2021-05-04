import React, { Fragment, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getProfiles } from '../../actions/profile';
import { getConcerts } from '../../actions/concert';
import interactionPlugin from "@fullcalendar/interaction";

const MainCalendar = ({
    getCurrentProfile,
    getConcerts,
    getProfiles,
    profile: { profiles },
    concert: { concerts },
    auth: { user },
    profile: {
        profile,
        loading
    }}) => {
        useEffect(() => {
            getCurrentProfile();
            getConcerts();
            getProfiles();
    }, [getCurrentProfile, getConcerts, getProfiles]);
    const history = useHistory();

    const concertEvents = concerts.map(conc => (
                            { title: conc.listenerName,
                              start: conc.dateFor,
                              end: conc.dateFor,
                              id: conc._id,
                              backgroundColor: conc.asap ? "red" : 'blue',
                              borderColor: conc.asap ? "yellow" : 'blue',
                              editable: false,
                            }))
    const musicianAvailabilityEvents = profiles.map(prof => prof.availability.map(avail => ({
                                    title: prof.user.name,
                                    start: avail.from,
                                    end: avail.to,
                                    backgroundColor: 'blue',
                                    borderColor: 'blue',
                                    editable: false,
    })))

    for (var i = 0; i < musicianAvailabilityEvents.length; i++) {
        for (var p = 0; p < musicianAvailabilityEvents[i].length; p++) {
            concertEvents.push(musicianAvailabilityEvents[i][p]);
    }}

    const handleDateClick = useCallback(arg => {
        console.log(arg);
    }, []);

    const handleEventClick = useCallback(arg => {
        history.push(`/concerts/${arg.event.id}`)
    }, []);

    return <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                initialView="dayGridMonth"
                weekends={true}
                events={concertEvents}
                selectable={true}
                editable={true}
                  />
    }


MainCalendar.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    concert: state.concert
});

export default connect(mapStateToProps, { getCurrentProfile, getProfiles, getConcerts } )(MainCalendar);
