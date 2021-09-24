import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Provider, Translate, Translator } from 'react-translated';
import contactTranslation from '../translation/contact';
import titlesTranslation from '../translation/titles';
import landingTranslation from '../translation/landing';
import navbarTranslation from '../translation/navbar';
import { Textfit } from 'react-textfit';
import MusicaParaRespirar from './about/MusicaParaRespirar';
import LaSociedad from './about/LaSociedad';
import Team from './about/Team';
import axios from 'axios';


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

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        language: languageCode
    });

    const [formResponse, setFormResponse] = useState({
        type: null,
        message: null
    });

    const [sendIsSpinner, setSendIsSpinner] = useState(false);


    const handleSubmit = async event => {
        try {
            const res = await axios.post('https://api.musicapararespirar.com/v1/newsletter/subscriber/new', formData );
            console.log(res);
            if(res.status === 200) {
                setSendIsSpinner(false);
                setFormResponse({type: "success", message: "Welcome :)"})
            }
        }
        catch(err) {
            console.log(err.response.status);
            if(err.response.status === 400 && err.response.data.detail === "newsletter_user_exists") {
                setSendIsSpinner(false);
                setFormResponse({type: "error", message: "User already exists!"});
            } else {
                setSendIsSpinner(false);
                setFormResponse({type: "error", message: "Server error try again"})
            }
            console.log(err.response);
        }
    }

    const [displayInformationFor, setDisplayInformationFor] = useState(null);
    return <Provider language={languageCode} translation={allTranslations}>
            <div className="inner-landing-container about" style={{textAlign: 'center', minHeight: '70vh'}}>
            <Textfit mode='single' forceSingleModeWidth={true} min={30}>
                <h1 className='mpr-header gold'>
                    <Translate text="CONTACT US" />
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
                <Translate text="ContactUs" />: <a onClick={e => window.umami('Clicked Email Link (contact)')} className='pink-link' href="mailto:lasociedad.bo@gmail.com">LASOCIEDAD.BO@GMAIL.COM</a>
                <br/><br/>
                <Translate text="newsAndUpdates" />:<br/>
                <a
                    className="gold-link"
                    onClick={e => window.umami('Clicked Facebook (contact)')}
                    href="https://www.facebook.com/lasociedad.bo/"
                    target='_blank'>Facebook
                </a>, <a
                    className="gold-link"
                    onClick={e => window.umami('Clicked Instagram (contact)')}
                    href="https://www.instagram.com/lasociedad.bo"
                    target='_blank'>Instagram
                </a>, <a
                    className="gold-link"
                    onClick={e => window.umami('Clicked Twitter (contact)')}
                    href="https://twitter.com/musicabolivia"
                    target='_blank'>Twitter
                </a> <Translate text='and'/> <a
                    className="gold-link"
                    onClick={e => window.umami('Clicked YouTube (contact)')}
                    href="https://www.youtube.com/channel/UCbU3H6WfXEusfNVWY5opUyg"
                    target='_blank'>YouTube
                </a>, <Translate text="andmailinglist" />:

                <Translator>
            {({ translate }) => (
            <form style={{alignItems: 'center', textAlign: 'center'}}
            className="form"
            onSubmit={e => {
                e.preventDefault();
                setSendIsSpinner(true);
                handleSubmit(formData);
                }}>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder={translate({text: '* {firstName}'})}
                    name="firstName"
                    value={formData.first_name}
                    onChange={e => setFormData({
                        ...formData,
                        first_name: e.target.value
                    })}
                    required />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder={translate({text: '* {lastName}'})}
                    name="lastName"
                    value={formData.last_name}
                    onChange={e => setFormData({
                        ...formData,
                        last_name: e.target.value
                    })}
                    required />
                </div>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder={translate({text: '* {email}'})}
                    name="email"
                    value={formData.email}
                    onChange={e => setFormData({
                        ...formData,
                        email: e.target.value
                    })}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    required />
                </div>
                <p
                style={{textAlign: 'left', lineHeight: '1px'}}
                className=""><Translate text="languagePref"/>:
                </p>
                <div className="form-group">
                    <select name="language"
                    onChange={e => {
                        setFormData({
                                ...formData,
                                language: e.target.value
                        })}}>
                        <option id='pt' value="pt" selected={languageCode==='pt'}>Português</option>
                        <option id='es' value="es" selected={languageCode==='es'}>Español</option>
                        <option id='en' value="en" selected={languageCode==='en'}>English</option>
                    </select>
                </div>

                {sendIsSpinner ? <Spinner /> : <input style={{fontSize: '2rem'}} type="submit" value="SEND" />}
                <br/>{formResponse.message}
            </form>
            )}
        </Translator>
        </div>
        </div>
            </Provider>
}

Contact.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect( mapStateToProps )(Contact);
