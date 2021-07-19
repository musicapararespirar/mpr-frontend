import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import concertTranslation from '../translation/concerts';
import titlesTranslation from '../translation/landing';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import Gallery from "react-grid-gallery";
import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import img4 from './images/4.png';
import img5 from './images/5.png';
import img6 from './images/6.png';
import img7 from './images/7.png';
import img8 from './images/8.png';
import img9 from './images/9.png';

const Seasons = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...concertTranslation,
        ...titlesTranslation
    }
    const photos = [{src: img1, thumbnail: img1, thumbnailWidth: 630, thumbnailHeight: 700},
                    {src: img2, thumbnail: img2, thumbnailWidth: 630, thumbnailHeight: 700},
                    {src: img3, thumbnail: img3, thumbnailWidth: 630, thumbnailHeight: 700},
                    {src: img4, thumbnail: img4, thumbnailWidth: 630, thumbnailHeight: 700},
                    {src: img5, thumbnail: img5, thumbnailWidth: 630, thumbnailHeight: 700},
                    {src: img6, thumbnail: img6, thumbnailWidth: 630, thumbnailHeight: 700},
                    {src: img7, thumbnail: img7, thumbnailWidth: 630, thumbnailHeight: 700},
                    {src: img8, thumbnail: img8, thumbnailWidth: 630, thumbnailHeight: 700},
                    {src: img9, thumbnail: img9, thumbnailWidth: 707, thumbnailHeight: 679},
                   ]

    return <Provider language={languageCode} translation={allTranslations}>
    <Fragment>
    <Gallery
        images={photos}
        enableLightbox={true}
        maxRows={4}
        margin={0.5}
        backdropClosesModal
        rowHeight={600}
        isOpen={false}
    />
    </Fragment>
    </Provider>
}


Seasons.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Seasons);
