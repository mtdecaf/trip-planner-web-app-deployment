// this model is used to create a trip under a user according to the user's email
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    // each trip object is has a trip id, trip name, trip start date, trip end date, trip start location, trip end location, and days array with the length of the days between the start and end date
    email: {
        type: String,
        required: true
    },

    tripName: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    startLocation: {
        type: Object,
        required: true,
    },
    endLocation: {
        type: String,
        required: true,
    },
    tripId: {
        type: String,
        required: true,
    },
    days: {
        type: Number,
        required: true,
    },
    events: {
        type: Object,
    }
});

const Trip = mongoose.model('Trip', tripSchema, 'trips');

module.exports = Trip;