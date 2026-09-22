const router = require('express').Router();
const Task = require('../models/Task');
const { auth } = require('../middleware/auth');
router.use(auth);

router.get('/', async (req, res) => res.json(await Task.find().sort('-createdAt')));
router.post('/', async (req, res) => res.json(await Task.create(req.body)));
router.put('/:id', async (req, res) => res.json(await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => { await Task.findByIdAndDelete(req.params.id); res.json({ ok: true }); });

module.exports = router;
