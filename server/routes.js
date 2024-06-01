// routes.js
import express from 'express';
import { countries } from './country.js';
import { states } from './state.js';
import { cities } from './city.js';

const router = express.Router();

router.get('/countries', (req, res) => {
  res.status(200).json(countries);
});

router.get('/states', (req, res) => {
    const { countryCode } = req.query;
    if (countryCode && states[countryCode]) {
      res.status(200).json(states[countryCode]);
    } else {
      res.status(200).json([]);
    }
  });
  

router.get('/cities', (req, res) => {
  const { stateCode } = req.query;
  if (stateCode) {
    const filteredCities = cities.filter(city => city.stateCode === stateCode);
    res.status(200).json(filteredCities);
  } else {
    res.status(200).json(cities);
  }
});

export default router;
