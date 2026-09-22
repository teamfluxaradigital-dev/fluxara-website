const router = require('express').Router();
const Lead = require('../models/Lead');
const { auth } = require('../middleware/auth');

router.post('/', async (req, res) => {
  res.json(await Lead.create(req.body));
});

router.get('/', auth, async (req, res) => {
  res.json(await Lead.find().sort('-createdAt'));
});

router.put('/:id', auth, async (req, res) => {
  res.json(await Lead.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }));
});

module.exports = router;
