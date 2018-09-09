
// Initializes the `positions` service on path `/positions`. (Can be re-generated.)
import { App } from '../../app.interface'

import createService from 'feathers-nedb'
import createModel from '../../models/positions.model'
import hooks from './positions.hooks'
// !code: imports // !end
// !code: init // !end

let moduleExports = function (app: App) {
  let Model = createModel(app)
  let paginate = app.get('paginate')
  // !code: func_init // !end

  let options = {
    Model,
    paginate,
    // !code: options_more // !end
  }
  // !code: options_change // !end

  // Initialize our service with any options it requires
  app.use('/positions', createService(options))

  // Get our initialized service so that we can register hooks
  const service = app.service('positions')

  service.hooks(hooks)
  // !code: func_return // !end
}

// !code: exports // !end
export default moduleExports

// !code: funcs // !end
// !code: end // !end
