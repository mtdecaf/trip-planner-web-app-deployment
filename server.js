const mongoose = require('mongoose');
const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();


const signUpRoute = require('./server/routes/SignUpRoute');
const logInRoute = require('./server/routes/LogInRoute');

const addTripRoute = require('./server/routes/AddTripRoute');
const getUserTripsRoute = require('./server/routes/GetUserTripsRoute');
const getCurrentTripRoute = require('./server/routes/GetCurrentTripRoute');
const editTripRoute = require('./server/routes/EditTripRoute');
const deleteTripRoute = require('./server/routes/DeleteTripRoute');

const addEventsRoute = require('./server/routes/AddEventsRoute');

// authorization middleware
const TokenAuth = require('./server/routes/TokenAuth');


// port at 8080 if not specified
const port = process.env.PORT || 8080;
const password = process.env.DBPASSWORD;

app.use(express.json());
app.use(cors());
app.options('*', cors())


// connect to the database
// mongoose.mongodb = mongoose.connect('mongodb://localhost:27017/userInfo')
//     .then(() => {
//         console.log('Connected to the local database');
//     })
//     .catch(err => {
//         console.log(err);
//     });
mongoose.mongodb = mongoose.connect(`mongodb+srv://mtdecaf:${password}@userinfo.bsbxr.mongodb.net/userInfo?retryWrites=true&w=majority`)
// check if connection is successful
.then(() => {
    console.log('Connected to the Atlas database');
}).catch(err => {
    console.log(err);
}); 
// authentication and authorization routes
app.use('/signup', signUpRoute);
app.use('/login', logInRoute);

// trips routes
app.use('/addtrip', addTripRoute);
app.use('/gettrip', getUserTripsRoute);
app.use('/getcurrenttrip', getCurrentTripRoute);
app.use('/edittrip', editTripRoute);
app.use('/deletetrip', deleteTripRoute);

// events routes
app.use('/addevents', addEventsRoute)


// middleware to handle token verification after logging in
app.use("/welcome", TokenAuth);

app.listen({port}, () => {
});