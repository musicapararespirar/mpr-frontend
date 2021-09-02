import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import concertTranslation from '../translation/concerts';
import titlesTranslation from '../translation/landing';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';

// import LightGallery from 'lightgallery/react';
// import 'lightgallery/css/lightgallery.css';
// import 'lightgallery/css/lg-zoom.css';
// import 'lightgallery/css/lg-thumbnail.css';
// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
import ResponsiveGallery from 'react-responsive-gallery';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import img1 from './images/1.png';
import img2 from './images/2.png';
import img3 from './images/3.png';
import img4 from './images/4.png';
import img5 from './images/5.png';
import img6 from './images/6.png';
import img7 from './images/7.png';
import img8 from './images/8.png';
import img9 from './images/9.png';

interface AppProps {}
interface AppState {
    settings: LightGallerySettings;
}

const Seasons = ({
    language: {
        languageCode
    },
}) => {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    const allTranslations = {
        ...concertTranslation,
        ...titlesTranslation
    }
    const photos = [{src: img1, thumbnail: img1, thumbnailWidth: 630, thumbnailHeight: 700, lightboxCaption: "image caption",
            lightboxTitle: "image title",},
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

        <ResponsiveGallery useLightBox lightBoxAdditionalProps={{imagePadding:40}} images={photos}
        screenWidthSizes={{
          xs: 400,
          s: 600,
          m: 800,
          l: 1000,
          xl: 1200
        }}
        numOfImagesPerRow={{
          xs: 1,
          s: 2,
          m: 3,
          l: 4,
          xl: 5,
          xxl: 6
        }}
        imagesPaddingBottom={{
          xs: 2,
          s: 2,
          m: 2,
          l: 2,
          xl: 2,
          xxl: 2
        }}
        imagesMaxWidth={{
          xs: 100,
          s: 100,
          m: 100,
          l: 100,
          xl: 100,
          xxl: 100
        }}
        colsPadding={{
          xs: 2,
          s: 2,
          m: 2,
          l: 2,
          xl: 2,
          xxl: 2
        }}/>
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
