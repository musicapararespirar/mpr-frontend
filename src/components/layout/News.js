import React, { Fragment, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import concertTranslation from '../translation/concerts';
import newsTranslation from '../translation/news';
import titlesTranslation from '../translation/titles';
import navbarTranslation from '../translation/navbar';
import PropTypes from 'prop-types';
import LoginLogo from './LoginLogo'
import ConcertTypes from '../information/concerts/ConcertTypes.js';
import { Textfit } from 'react-textfit';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { CardActionArea } from '@material-ui/core';
import moment from 'moment';

const News = ({
    language: {
        languageCode
    },
}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        async function loadPosts() {

            const response = await fetch('https://blog-dev.musicapararespirar.com/wp-json/wp/v2/posts');
            if(!response.ok) {
                // oups! something went wrong
                console.log("Error loading news posts");
                return;
            }
            // Filter for only the latest 5 posts

            const posts = await response.json();
            const postsToDisplay = posts.slice(0, 5);

            setPosts(postsToDisplay);
        }

        loadPosts();
        console.log("News posts loaded:", posts.length)

    }, [])


    // Combine translation files
    const allTranslations = {
        ...titlesTranslation,
        ...concertTranslation,
        ...navbarTranslation,
        ...newsTranslation
    }
    const backButton = (
        <Fragment>
            <button onClick={e => (setTypesActive(false))}>
                <i className="fas fa-long-arrow-alt-left" /> <Translate text="Back" />
            </button>
        </Fragment>
    );

    const [typesActive, setTypesActive] = useState(false);
    const cardStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        transition: 'background-color 0.3s ease',
      };

      const hoverStyle = {
        backgroundColor: 'rgba(255, 255, 255, 1.0)',
      };
    const requestMainPage = (
        <Fragment>

            <div className='inner-landing-container about'>
            <Textfit mode='single' forceSingleModeWidth={true} max={200}>
            <h1 className='mpr-header'>
                <Translate text="NEWS" />
            </h1></Textfit>
                <div style={{
                    display: 'inline-block',
                    letterSpacing: '1px',
                    fontSize: '1rem',
                    lineHeight: 2,
                    textAlign: 'justify',
                    fontWeight: 'lighter'
                }}>
                <i className='line-gold' />
                <Grid container spacing={2}>
                        {posts.map((post, index) => (
                        <Grid item xs={12} key={index}>
                                <Card style={cardStyle}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = cardStyle.backgroundColor}>
                                    <CardActionArea href={post.link} target="_blank">
                            <CardContent>
                                    <Typography
                                        color="textSecondary"
                                        // gutterBottom
                                        dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                    <Typography
                                                color="primary"

                                        gutterBottom
                                        dangerouslySetInnerHTML={{__html: moment(new Date(post.date)).fromNow()}} />
                                    <Typography
                                        variant="body2"
                                        component="p"
                                        dangerouslySetInnerHTML={{__html: post.content.rendered}} />
                                    </CardContent>
                                    </CardActionArea>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                </div>

           <a onClick={e => window.umami('Clicked News')} href="https://blog-dev.musicapararespirar.com/" target="_blank"> <small style={{
                    display: 'inline-block',
                    letterSpacing: '2.5px',
                    fontSize: '1rem',
                    lineHeight: 3,
                    textAlign: 'justify',
                    fontWeight: 500,
                    color: '#ea9d28'
                }}><Translate text="visitNewsPage" /> <i className="fas fa-long-arrow-alt-right" /></small></a>




                </div>
            </Fragment>
    );

    return <Provider language={languageCode} translation={allTranslations}>
        <Fragment>
            {typesActive ? <ConcertTypes /> : requestMainPage }
            <div className='wide-landing-container about' style={{ bottom: '5vh', marginTop: '10vh'}}>
                {typesActive ? backButton : null}
            </div>
        </Fragment>
    </Provider>
}


News.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(News);
