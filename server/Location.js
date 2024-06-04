// Location.js
import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
  name: String,
});

const stateSchema = new mongoose.Schema({
  name: String,
  code: String,
  cities: [citySchema],
});

const countrySchema = new mongoose.Schema({
  name: String,
  code: String,
  states: [stateSchema],
});

export const Country = mongoose.model('Country', countrySchema);
