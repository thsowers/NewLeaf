
// Initializes the `jobs` service on path `/jobs`
import { App } from '../../app.interface'

import createService from 'feathers-mongodb'
import hooks from './jobs.hooks'
import { Db, MongoClient } from 'mongodb'
// !<DEFAULT> code: imports
// import $jsonSchema from './jobs.mongo'
// !end
// !code: imports // !end
// !code: init // !end

let moduleExports = function (app: App) {
  let paginate = app.get('paginate')
  let mongoClient = app.get('mongoClient') as Promise<Db>
  let options = { paginate }
  // !code: func_init // !end

  // Initialize our service with any options it requires
  app.use('/jobs', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('jobs')

  mongoClient.then(db => {
    return db.createCollection('jobs', {
      // !<DEFAULT> code: create_collection
      // validator: { $jsonSchema: $jsonSchema },
      // validationLevel: 'strict', // The MongoDB default
      // validationAction: 'error', // The MongoDB default
      // !end
    })
  })
    .then(serviceModel => {
      (service as any).Model = serviceModel
    })

  service.hooks(hooks)
  // !code: func_return // !end
}
// !code: more // !end

// !code: exports // !end
export default moduleExports

// !code: funcs // !end
// !code: end // !end
