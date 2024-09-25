const express = require('express');
const router = express.Router();
const Transcript = require('../models/Transcript');

// Get all transcripts
router.get('/', async (req, res) => {
  try {
    const transcripts = await Transcript.find().sort({ createdAt: -1 });
    res.json(transcripts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;