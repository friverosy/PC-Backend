'use strict';

var express = require('express');
var controller = require('./itinerary.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

// router.get('/:id/routes', controller.getRoutes);
// router.get('/:id/manifests', controller.getManifests);
// router.get('/:id/registers', controller.getRegisters);

module.exports = router;
