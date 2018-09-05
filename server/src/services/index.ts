
// Configure the Feathers services. (Can be re-generated.)
import { App } from '../app.interface'
import jobs from './jobs/jobs.service'
import todo from './todo/todo.service'

import graphql from './graphql/graphql.service'
// !code: imports // !end
// !code: init // !end

// tslint:disable-next-line no-unused-variable
let moduleExports = function (app: App) {
  app.configure(jobs)
  app.configure(todo)

  app.configure(graphql)
  // !code: func_return // !end
}

// !code: exports // !end
export default moduleExports

// !code: funcs // !end
// !code: end // !end
