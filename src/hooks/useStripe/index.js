import React, { useState } from 'react'
import { config } from '../../config'
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';

export const useStripe = () => {

    const ReqStripePayment = async (stripeId, amount) => {
        try {
            let url = `https://us-central1-bulky-49e60.cloudfunctions.net/paymentSheet`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: stripeId,
                    amount: amount,
                }),
            });
            const responseData = await response.json();
            if (responseData?.error) {
                return { success: false, message: responseData.error };
            }
            if (responseData) {
                const { paymentIntent, ephemeralKey, userId } = responseData;
                const { error } = await initPaymentSheet({
                    merchantDisplayName: "Example, Inc.",
                    customerId: userId,
                    returnURL: "mint://stripe-redirect",
                    customerEphemeralKeySecret: ephemeralKey,
                    paymentIntentClientSecret: paymentIntent,
                    allowsDelayedPaymentMethods: true,
                    defaultBillingDetails: {
                        name: "Name...",
                    },
                });
                if (!error) {
                    // console.log('No Error')
                    return await openPaymentSheet();
                }
                if (error) {
                    console.log("Error", error);
                }
                console.log("responseData.success:", responseData.success);
            } else {
                console.log(responseData.error);
            }
        } catch (error) { }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        if (error) {
            // setLoading(false)
            console.log(`Error code: ${error.code}`, error.message);
            return { success: false, message: error.message };
        } else {
            // setLoading(false)
            console.log("Success", "Your order is confirmed!");
            return { success: true, message: "Your order is confirmed!" };
        }
    };


    return {
        ReqStripePayment
    }
}
