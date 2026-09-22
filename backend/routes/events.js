const router = require('express').Router();
const Event = require('../models/Event');
const { auth } = require('../middleware/auth');
router.use(auth);

router.get('/', async (req, res) => res.json(await Event.find().sort('date')));
router.post('/', async (req, res) => res.json(await Event.create(req.body)));
router.put('/:id', async (req, res) => res.json(await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => { await Event.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

module.exports = router;
