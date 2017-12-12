import mongoose from 'mongoose';

module.exports = function(){
       var config = require('./config');
       mongoose.set('debug', config.debug);
       mongoose.Promise = global.Promise;
       const db = mongoose.connect(config.mongoUri, {
              useMongoClient: true
              /* other options */
       });

       require('../app/models/user.model');
       require('../app/models/department.model');
       return db;
} 