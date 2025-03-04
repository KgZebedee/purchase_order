
const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  cell: { type: String, required: true },
  contactPersonName: { type: String, required: true },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
