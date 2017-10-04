require('dotenv').config();
const appConfig = require('../config/app');
const path = require('path');
const async = require('async');

global.config = () => (appConfig);
global.Promsie = Promise;

global.db = require('../server/core/database/mongo');

const seeds = {
  User: 'User.js',
  Food: 'Food.js',
};
async.series(
  Object.keys(seeds).map((seed)=> {
    const Item = require(path.join(__dirname, seed));
    return new Item().run;
  }),
(error, result) => {
    if(error) {
      throw new Error(error);
    }

    process.exit();
    console.log('All Seed has been done');
});
