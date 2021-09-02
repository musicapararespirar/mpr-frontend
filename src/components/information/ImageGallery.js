import React, { Fragment,useState, useCallback } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { Provider, Translate } from 'react-translated';
import concertTranslation from '../translation/concerts';
import titlesTranslation from '../translation/titles';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import slideshow1 from '../../img/landing1.jpeg';
import slideshow2 from '../../img/landing2.jpeg';
import slideshow3 from '../../img/landing3.jpeg';
import slideshow4 from '../../img/landing4.jpeg';
import slideshow5 from '../../img/landing5.jpeg';
import Carousel, { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";

const ImageGallery = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...concertTranslation,
        ...titlesTranslation
    }
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };
    const photos = [{
        src: slideshow1,
        width: 320,
        height: 174,
    },{
        src: slideshow2,
        width: 320,
        height: 174,
    },]
    return <Provider language={languageCode} translation={allTranslations}>
    <Fragment>
        <Gallery photos={photos} onClick={openLightbox} />
        <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>

            </Fragment></Provider>
}


ImageGallery.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(ImageGallery);
