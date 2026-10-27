const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true }, 
  chronologicalEra: { type: String, required: true },
  barangay: { type: String, required: true }, 
  localHero: { type: String }, 
  fileUrl: { type: String, required: true },
  fileType: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HistoricalResource', ResourceSchema);