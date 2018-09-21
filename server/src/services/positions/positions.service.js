// Initializes the `positions` service on path `/position`
const createService = require('feathers-mongodb');
const hooks = require('./positions.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/position', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('position');

  mongoClient.then(db => {
    service.Model = db.collection('positions');
  });

  service.hooks(hooks);
};
