const Model = require('../server/core/model/User');

class User {
  static getData() {
    return [
      { first_name: 'Dipen', last_name: 'pancholi', role: 'owner', email: 'owner@gmail.com',
      status: 1,
      hash: '$2a$10$Plk12xtlFCj2FBCfKUefjuBVX5nULoHSGL6KbQ.qtqTiCkJj5gddS',
      password: '$2a$10$Plk12xtlFCj2FBCfKUefjueybR2b.3fJgFeG8QI8eFxwIC/SaEpN6'
     },
      { first_name: 'Puran', last_name: 'chmjong', email: 'admin@gmail.com', role: 'admin',
      status: 1,
      hash: '$2a$10$Plk12xtlFCj2FBCfKUefjuBVX5nULoHSGL6KbQ.qtqTiCkJj5gdda',
      password: '$2a$10$Plk12xtlFCj2FBCfKUefjueybR2b.3fJgFeG8QI8eFxwIC/SaEpN6'
     },
    ];
  }

  run(callback) {
    Model.collection.insert(User.getData(), (error, result) => {
      if (error) {
        console.error('Error while seeding');
        return callback(error, null);
      }

      console.log('Seeding done.');
      return callback(null, true);
    });
  }
}

module.exports = User;
