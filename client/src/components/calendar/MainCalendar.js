import React, { Fragment, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FullCalendar, { changeView } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getProfiles } from '../../actions/profile';
import { getConcerts } from '../../actions/concert';
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from '@fullcalendar/core/locales/es';

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
                                    backgroundColor: prof.colour,
                                    borderColor: 'black',
                                    editable: false,
                                    selectable: false,
                                    type: 'musician',
                                    id: prof.user._id,
    })))

    for (var i = 0; i < musicianAvailabilityEvents.length; i++) {
        for (var p = 0; p < musicianAvailabilityEvents[i].length; p++) {
            concertEvents.push(musicianAvailabilityEvents[i][p]);
    }}

    const handleDateClick = useCallback(arg => {
        console.log(arg);
        arg.view.calendar.changeView('timeGridDay', arg.dateStr);

//         if(arg.view.type=="dayGridMonth"){
//             changeView("timeGridDay",arg.dateStr);
//         }
    }, []);

    const handleEventClick = useCallback(arg => {
        console.log(arg);
        if (arg.event.extendedProps.type === 'musician') {
            history.push(`/profile/${arg.event.id}`);
        } else {
            history.push(`/concerts/${arg.event.id}`);
        }
    }, []);
<script src='fullcalendar/locale/es.js'></script>
    return <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                initialView="timeGridDay"
                weekends={true}
                events={concertEvents}
                selectable={true}
                editable={true}
                slotDuration="00:05:00"
                locale="es"
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
