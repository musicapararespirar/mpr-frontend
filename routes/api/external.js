const express = require('express');
const axios = require('axios');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route  GET external/location/:id
// @desc   Get information about a location according to Google Place ID
// @access Public
router.get('/location/:id', async (req, res) => {
    try {
        const location = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&key=AIzaSyAL44Nx7XNZVHgRQd0dugCD8zvw8CJYRc8`);
        if(!location) {
            return res.status(404).json({ msg: "Location not found" });
        }
        const lat = location.data.result.geometry.location.lat;
        const lng = location.data.result.geometry.location.lng;
        const now = new Date().getTime() / 1000;
        const timezone = await axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${now}&key=AIzaSyAL44Nx7XNZVHgRQd0dugCD8zvw8CJYRc8`);
        console.log(lat, lng, now, timezone);

        if(!timezone) {
            return res.status(404).json({ msg: "Timezone not found" });
        };

//         res.json(timezone.data);
        res.json({
            latitude: location.data.result.geometry.location.lat,
            longitude: location.data.result.geometry.location.lng,
            location: location.data.result.formatted_address,
            timezone: timezone.data.timeZoneId
        });
    } catch(err) {
        console.error(err.message);
        if(err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Concert not found" });
        }
        res.status(500).send("Server error");
    }
});

module.exports = router;

