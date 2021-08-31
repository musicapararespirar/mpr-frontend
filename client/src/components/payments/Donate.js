import React, { Fragment }from "react";
import { loadStripe } from "@stripe/stripe-js";
import { connect } from 'react-redux';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../payments/CheckoutForm';
import { Provider, Translate } from 'react-translated';
import supportTranslation from '../translation/support';
import titlesTranslation from '../translation/titles';
import PropTypes from 'prop-types';

const promise = loadStripe("pk_test_51IqaDELHTCikUAWZC4rVEwjy7UPfoWeoRKbtSlSvzSVzrtWnVLNMTssIXXlGoJrU7g7zzBE9sOLjjI3cr1IuLdfi00q3SnQz3C");

const Donate = ({
    language: {
        languageCode
    },
}) => {
    // Combine translation files
    const allTranslations = {
        ...supportTranslation,
        ...titlesTranslation
    }

  return <Provider language={languageCode} translation={allTranslations}>
  <Fragment>
        <section className="donate">
        <p className="lead">
            <i className="fas fa-music"></i> <Translate text="Donate" />
        </p>
            <p><Translate text="enterDetails" /></p>
        </section>
    </Fragment></Provider>
}

Donate.propTypes = {
    language: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(Donate);
