
/* tslint:disable no-unused-variable, indent */
// Define GraphQL resolvers using only Feathers services. (Can be re-generated.)
import { App } from '../../app.interface'
import { Paginated } from '@feathersjs/feathers'
import { ResolverMap } from './graphql.interfaces'
// !code: imports // !end
// !code: init // !end

export interface ServiceResolverOptions {
  convertArgsToFeathers: any;
  extractAllItems: any;
  extractFirstItem: any;
}

let moduleExports = function serviceResolvers(app: App, options: ServiceResolverOptions) {
  const {convertArgsToFeathers, extractAllItems, extractFirstItem} = options
  // !<DEFAULT> code: extra_auth_props
  const convertArgs = convertArgsToFeathers([])
  // !end

  // !<DEFAULT> code: services
  let jobs = app.service('/jobs')
  // !end

  let returns: ResolverMap = {

    Job: {
    },

    // !code: resolver_field_more // !end

    Query: {

      // !<DEFAULT> code: query-Job
      // getJob(query: JSON, params: JSON, key: JSON): Job
      getJob(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast)
        return jobs.get(args.key, feathersParams).then(extractFirstItem)
      },

      // findJob(query: JSON, params: JSON): [Job!]
      findJob(parent, args, content, ast) {
        const feathersParams = convertArgs(args, content, ast, { query: { $sort: {   _id: 1 } } })
        return jobs.find(feathersParams).then(paginate(content)).then(extractAllItems)
      },
      // !end
      // !code: resolver_query_more // !end
    },
  }

  // !code: func_return // !end
  return returns
}

// !code: more // !end

// !code: exports // !end
export default moduleExports

function paginate(content: any) {
  return (result: any[] | Paginated<any>) => {
    content.pagination = !isPaginated(result) ? undefined : {
      total: result.total,
      limit: result.limit,
      skip: result.skip,
    }

    return result
  }
}

function isPaginated<T>(it: T[] | Paginated<T>): it is Paginated<T> {
  return !!(it as any).data;
}
// !code: funcs // !end
// !code: end // !end
