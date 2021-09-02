import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getConcertResponseById } from '../../actions/concert';
import Moment from 'react-moment';
import 'moment-timezone';

import {ChatWidget, ChatWindow, Papercups} from '@papercups-io/chat-widget';
import {Storytime} from '@papercups-io/storytime';

{/*const st = Storytime.init({
  accountId: '9020932e-93af-4211-aae8-82b13f49f3ca',

//   Optionally pass in metadata to identify the customer
  customer: {
   name: 'Test User',
   email: 'test@test.com',
   external_id: '123',
  },

  // Optionally specify the base URL
  baseUrl: 'https://chat.evanjt.com',
});*/}

const IndividualConcert = ({

    getConcertResponseById,
    concert: {
        concert,
        loading,
        request
    },
    match
}) => {
    useEffect(() => {
        getConcertResponseById(match.params.id);
    }, [getConcertResponseById, match.params.id]);
    return <Fragment>
          <ChatWidget
        title="Welcome to Musica Para Respirar"
        subtitle= "Please wait for one of our coordinators 😊"
        primaryColor="#ef9e21"
        greeting="One moment please"
        newMessagePlaceholder="Start typing..."
        accountId="9020932e-93af-4211-aae8-82b13f49f3ca"
        baseUrl="https://chat.evanjt.com"
        greeting='Hi there! How can I help you?'
        isOpenByDefault={true}
        showAgentAvailability={true}
        requireEmailUpfront={true}
        setDefaultGreeting={(settings) => {console.log(settings)}}
        onChatOpened={() => console.log(ChatWidget)}
      />

        {loading || concert === null ? <Spinner /> : <Fragment>
            <h1>Concert</h1>
            Thank you for your request! <br/>
            Please wait for a response in our chat from one of our coordinators :)<br/><br/>

            <b>Request For</b>: {concert.listenerName}<br />
            <b>Chosen musician</b>: {concert.preferredMusicianName}<br />
            <b>Time</b>: <Moment format='DD/MM h:mm:ss'>{concert.dateFor}</Moment> (<Moment fromNow>{concert.dateFor}</Moment>)<br/>
            {concert.scheduled === true ?
                <div className="btn btn-primary my-1">Scheduled</div>
                :
                <div className="btn btn-danger my-1">Not Scheduled</div>
            }
            <a href={`http://video.evanjt.com/call/${concert._id}`} target="_blank">
                <div className="btn btn-primary my-1"><i className="fas fa-video" /> Goto Call</div>
            </a>
            </Fragment>
        }
    </Fragment>
};

IndividualConcert.propTypes = {
    getConcertResponseById: PropTypes.func.isRequired,
    concert: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    concert: state.concert,
    auth: state.auth
});

export default connect(mapStateToProps, { getConcertResponseById })(IndividualConcert);
