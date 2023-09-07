const express = require('express');
const query = require('../queries/location.query.cjs')
const router = express.Router();

/**
 * @api {get} /api/location - Get all locations from database
 */

router.get('/', async(_, res) => {
    try {
        locations = await query.getLocations();
        res.status(200).send(locations);
    } catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
});

module.exports = router;