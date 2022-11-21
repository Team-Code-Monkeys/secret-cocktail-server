import dotenv from "dotenv";
import express from "express";
import * as firebase from "firebase-admin";

dotenv.config();

const firebaseCredentials: any = {
    type: process.env.firebase_type,
    project_id: process.env.firebase_project_id,
    private_key_id: process.env.firebase_private_key_id,
    private_key: process.env.firebase_private_key ? process.env.firebase_private_key.replace(/\\n/gm, "\n") : undefined,
    client_email: process.env.firebase_client_email,
    client_id: process.env.firebase_client_id,
    auth_uri: process.env.firebase_auth_uri,
    token_uri: process.env.firebase_token_uri,
    auth_provider_x509_cert_url: process.env.firebase_auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.firebase_client_x509_cert_url
};

for (const [key, value] of Object.entries(firebaseCredentials)) {
    if (value === undefined) {
        console.error(`${key} environment variable is undefined `);
        process.exit(1);
    }
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
firebase.initializeApp({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    credential: firebase.credential.cert(firebaseCredentials),
})

// example of giving a user the admin role
const admin_uid = 'vPqG3OAg3OYC6ye961LcqwJPUsH2';
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
firebase.auth().setCustomUserClaims(admin_uid, {admin: true})
    .then(() => {
        console.log('successfully set user claims for admin');
    }).catch((error) => {
    console.error('unable to set user claims for admin', error);
});

// example of giving a user the facility role
const facility_uid = '7rbmbMXqHldpuq8AQAnykPmdfY03';
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
firebase.auth().setCustomUserClaims(facility_uid, {facility: true})
    .then(() => {
        console.log('successfully set user claims for facility');
    }).catch((error) => {
    console.error('unable to set user claims for facility', error);
});

const app = express()
const port = process.env.PORT || 8080
app.get("/", (_, res) => res.send("Hello World"))

app.listen(port, () => {
    console.log(`Application running on port ${port}.`)
})
