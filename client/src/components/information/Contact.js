import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Provider, Translate } from 'react-translated';
import contactTranslation from '../translation/contact';
import titlesTranslation from '../translation/titles';
import landingTranslation from '../translation/landing';
import navbarTranslation from '../translation/navbar';
import { Textfit } from 'react-textfit';
import MusicaParaRespirar from './about/MusicaParaRespirar';
import LaSociedad from './about/LaSociedad';
import Team from './about/Team';
import MailchimpSubscribe from "react-mailchimp-subscribe"

const mailchimpURL = "//evanjt.us5.list-manage.com/subscribe/post?u=18e4b7f031750b28dbf9ff1a5&amp;id=0abca7a592";

const Contact = ({
    language: { languageCode }
}) => {
    // Combine translation files
    const allTranslations = {
        ...contactTranslation,
        ...titlesTranslation,
        ...landingTranslation,
        ...navbarTranslation
    }

    const SimpleForm = () => <MailchimpSubscribe url={mailchimpURL}/>

    const [displayInformationFor, setDisplayInformationFor] = useState(null);
    return <Provider language={languageCode} translation={allTranslations}>
            <Fragment>
                <Fragment>
            <div className="inner-landing-container about" style={{textAlign: 'center', minHeight: '45vh'}}>
            <Textfit mode='single' forceSingleModeWidth={true} min={30}>
                <h1 className='mpr-header gold'>
                    <Translate text="CONTACT" />
                </h1>
            </Textfit>
            <div style={{
                display: 'inline-block',
                letterSpacing: '1px',
                fontSize: '1rem',
                lineHeight: 2,
                textAlign: 'justify',
                fontWeight: 'lighter'
            }}>
            <Translate text="ContactUs" />: <a className='pink-link' href="mailto:lasociedad.bo@gmail.com">LASOCIEDAD.BO@GMAIL.COM</a><br/><br/>
            <Translate text="newsAndUpdates" />:<br/>
            <a
                className="gold-link"
                href="https://www.facebook.com/lasociedad.bo/"
                target='_blank'>Facebook
            </a>, <a
                className="gold-link"
                href="https://www.instagram.com/lasociedad.bo"
                target='_blank'>Instagram
            </a>, <a
                className="gold-link"
                href="https://twitter.com/musicabolivia"
                target='_blank'>Twitter
            </a> <Translate text='and'/> <a
                className="gold-link"
                href="https://www.youtube.com/channel/UCbU3H6WfXEusfNVWY5opUyg"
                target='_blank'>YouTube
            </a>.
            <MailchimpSubscribe
                url={mailchimpURL}
                render={({ subscribe, status, message }) => (
                <div>
                    <SimpleForm onSubmitted={formData => subscribe(formData)} />
                    {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
                    {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{__html: message}}/>}
                    {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
                </div>
                )}
            />
            </div>

        </div>
        </Fragment>
            </Fragment>
            </Provider>
}

Contact.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps )(Contact);
