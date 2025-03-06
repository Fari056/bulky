
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51QU7NzHXn2HNJcrtnlKN8jWsV8JFIgCRDXYt5Yj9eM0ml9KISH58BrMiHyOhFUM2vEGJWppbzJgxJqi315VGMEhU00gDirwTN3');
const logger = require("firebase-functions/logger");
const { onRequest } = require("firebase-functions/v2/https");

admin.initializeApp();

exports.createStripeCustomer = functions.auth.user().onCreate(async (user) => {
    const customer = await stripe.customers.create({
        email: user.email,
    });

    // const account = await stripe.accounts.create({
    //     country: 'US',
    //     email: user.email,
    //     controller: {
    //         fees: {
    //             payer: 'application',
    //         },
    //         losses: {
    //             payments: 'application',
    //         },
    //         stripe_dashboard: {
    //             type: 'express',
    //         },
    //     },
    // });
    // const accountId = account?.id;

    await admin.firestore().collection('users').doc(user.uid).set({
        stripe_id: customer.id,
        // stripe_account_id: accountId,
    }, { merge: true });

    return null;
});

exports.onUserDelete = functions.auth.user().onDelete(async (user) => {
    try {
        // Retrieve the Stripe customer ID from your database
        const userRecord = await admin.firestore().collection('users').doc(user.uid).get();
        const stripeCustomerId = userRecord.data().stripe_id;
        if (stripeCustomerId) {
            await stripe.customers.del(stripeCustomerId);
            console.log(`Successfully deleted Stripe customer with ID: ${stripeCustomerId}`);
        } else {
            console.log(`No Stripe customer ID found for user: ${user.uid}`);
        }
    } catch (error) {
        console.error('Error deleting user from Stripe:', error);
    }
});

exports.paymentSheet = functions.https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET, POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.status(204).send('');
        return;
    }
    try {
        const { userId, amount } = req.body;
        const userRecord = await admin.firestore().collection('users').doc(userId).get();
        const stripeId = userRecord.data().stripe_id;
        if (!stripeId) {
            return res.status(404).json({ error: 'Stripe ID not found for user.' });
        }
        if (!userId || !amount) {
            return res.status(400).json({ error: 'userId and amount are required.' });
        }
        const ephemeralKey = await stripe.ephemeralKeys.create({
            customer: stripeId,
        }, {
            apiVersion: "2023-10-16",
        });

        // Create a PaymentIntent for the user
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'eur',
            customer: stripeId,
            payment_method_types: ['card'],
            // automatic_payment_methods: {
            //     enabled: true,
            // },
        });

        res.status(200).json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            userId: stripeId,
            // publishableKey: 'your_publishable_key',
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error generating payment sheet.');
    }
});


exports.onCreateNotification = functions.firestore.document('Notifications/{notificationId}').onCreate(async (snapshot, context) => {
    const notificationData = snapshot.data();
    const userRef = admin.firestore().collection('users').doc(notificationData.receiver_id);
    const userDoc = await userRef.get();
    if (userDoc.exists) {
        const userData = userDoc.data();
        const userToken = userData.token;
        if (userToken) {
            const message = {
                notification: {
                    title: 'New Notification',
                    body: 'body'
                },
                token: userToken,
                data: {

                }
            };

            admin.messaging().send(message)
                .then(response => {
                    console.log('Successfully sent message:', response);
                })
                .catch(error => {
                    console.error('Error sending message:', error);
                });
        }
    }
    else {
        console.log('User not found');
    }
});

function uniqueID() {
    function chr4() {
        return Math.random().toString(16).slice(-4);
    }
    return (
        chr4() +
        chr4() +
        '-' +
        chr4() +
        '-' +
        chr4() +
        '-' +
        chr4() +
        '-' +
        chr4() +
        chr4() +
        chr4()
    );
}