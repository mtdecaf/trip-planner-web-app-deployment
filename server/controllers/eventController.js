const Trip = require('../models/tripModel.js');

exports.addEventsController = (req, res) => {
    const events = req.body.events;
    // convert the start and end time to Date objects in the events object
    // get the tripId from the request params
    const tripId = req.params.tripId;
    // find the trip with the tripId
    Trip.findOne({ tripId }, (err, trip) => {
        if (err) {
            res.status(400).send(err);
        } else {
            trip.events = events;
            trip.save((err) => {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.status(200).send(trip);
                }
            });
        }
    });
}