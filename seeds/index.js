require('dotenv').config();
const appConfig = require('../config/app');
const path = require('path');

global.config = () => (appConfig);
global.Promsie = Promise;

global.db = require('../server/core/database/mongo');

const seeds = {};

Object.keys(seeds).forEach((seed) => {
  const Item = require(path.join(__dirname, seed));
  new Item().run();
});
