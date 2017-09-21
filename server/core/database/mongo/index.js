const mongoose = require('mongoose');

const config = global.config();
const options = { promiseLibrary: global.Promise };
mongoose.connect(config.database.mongo.host, options);
const db = mongoose.connection;
db.on('error', (args) => {
  console.error('Error on database connection', args);
  process.exit(0);
});
db.once('open', () => {
  console.log(`Connected to database on host ${config.database.mongo.host}`);
});

mongoose.Promise = global.Promise;
module.exports = mongoose;
