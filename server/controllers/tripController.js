const Trip = require('../models/tripModel.js');

exports.addTripController = (req, res) => {
    // add trip to user's profile
    // only contains the trip's name, start and end date,  and the generates trip id
    const startDate = new Date(req.body.date[0]);
    const endDate = new Date(req.body.date[1]);

    let diff = Math.abs(startDate.getTime() - endDate.getTime());
    // number of days in the trip
    let days = Math.ceil(diff / (1000 * 3600 * 24));
    const { startLocation, endLocation, tripName, email, tripId } = req.body;
    // find trip if the email and useremail match

    Trip.findOne({ email: req.body.email }, (err, trip) => {
        if (err) {
            res.status(400).send(err);
        } else {
            // add trip data to trips collection
            const trip = new Trip({ 
                startDate, 
                endDate, 
                startLocation, 
                endLocation, 
                tripName, 
                email, 
                tripId, 
                days });
            trip.save((err) => {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send(trip);
                }
            });
        }
    });
}

// get all trips for a user with the email of the trip from the trip collection
exports.getUserTripsController = (req, res) => {
    // get the email of the current user from the request
    Trip.find({email: req.decoded.email}, (err, trip) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(trip);
        }
    });
}

exports.getCurrentTripController = (req, res) => {
    // get tripId from the request params
    const tripId = req.params.tripId;
    // find the trip with the tripId
    Trip.findOne({ tripId }, (err, trip) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(trip);
        }
    });
}

exports.editTripController = (req, res) => {
    // find the trip with the tripId
    const tripId = req.params.tripId;
    console.log(tripId);
    const tripData = req.body;
    console.log(tripData);
    Trip.findOne({ tripId }, (err, trip) => {
        // update the trip with the new data
        if (err) {
            res.status(400).send(err);
        } else {
            trip.startDate = tripData.startDate;
            trip.endDate = tripData.endDate;
            trip.startLocation = tripData.startLocation;
            trip.endLocation = tripData.endLocation;
            trip.tripName = tripData.tripName;
            trip.save((err) => {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send(trip);
                }
            });
        }
    });
}

exports.deleteTripController = (req, res) => {
    // find the trip with the tripId
    const tripId = req.params.tripId;
    Trip.findOne({ tripId }, (err, trip) => {
        // delete the trip
        if (err) {
            res.status(400).send(err);
        } else {
            trip.deleteOne((err) => {
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send(trip);
                }
            });
        }
    });
}

