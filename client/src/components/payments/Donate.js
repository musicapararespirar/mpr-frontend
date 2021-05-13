import React, { Fragment }from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from '../payments/CheckoutForm';

const promise = loadStripe("pk_test_51IqaDELHTCikUAWZC4rVEwjy7UPfoWeoRKbtSlSvzSVzrtWnVLNMTssIXXlGoJrU7g7zzBE9sOLjjI3cr1IuLdfi00q3SnQz3C");

const Donate = () => {

  return <Fragment>
        <section className="donate">
        <p className="lead">
            <i className="fas fa-music"></i> Donate
        </p>
            <p>Enter your credit card details below. We appreciate your contribution.</p>
        </section>
        <Elements stripe={promise}>
            <CheckoutForm amount="1000"/>
        </Elements>
    </Fragment>
}

export default Donate;
