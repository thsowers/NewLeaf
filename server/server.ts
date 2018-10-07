import * as Koa from 'koa'
import * as Cors from '@koa/cors'
import * as Router from 'koa-router'
import * as Json from 'koa-json'
import * as Parser from 'koa-body'
import * as cheerio from 'cheerio'
import axios from 'axios'
import Monk from 'monk'

const app = new Koa()
const router = new Router()

const db = Monk('mongodb://localhost:27017/newleaf')

db.catch(err => {
  throw new Error(err)
})

const positions = db.get('positions')

app.use(Json())
app.use(Parser())
app.use(Cors())
app.use(router.routes())
app.listen(3000)
console.log(db._state)
router.put('/position/', async ctx => {
  ctx.request.body.events = new Array({
    name: 'Created',
    details: ctx.request.body.source,
    timestamp: Date.now(),
  })
  ctx.body = await positions.insert(ctx.request.body)
})

router.post('/position/:id', async ctx => {
  console.log(ctx.params.id)
  console.log(ctx.request.body)
  ctx.body = await positions.update(ctx.params.id, ctx.request.body)
})

router.get('/positions', async ctx => {
  ctx.body = await positions.find({})
})

router.get('/position/:id', async ctx => {
  ctx.body = await positions.findOne(ctx.params.id)
})

router.delete('/position/:id', async ctx => {
  ctx.body = await positions.remove(ctx.params.id)
})

// Lookup Logo
router.post('/logoLookup/:id', async ctx => {
  const { data } = await getFaviconAPI(ctx.request.body.url)
  let iconURL = data.icons[0].src
  let img = await getBase64FromURL(iconURL)
  ctx.body = 'data:image/jpeg;base64,' + img
})

// Utilize antongunov/favicongrabber.com, sites have too much variance in
// favicon locations these days
async function getFaviconAPI(url: string) {
  return await axios.get('https://favicongrabber.com/api/grab/' + url)
}

// Helper function to get
async function getBase64FromURL(url: string) {
  return await axios
    .get(url, {
      responseType: 'arraybuffer',
    })
    .then(response => new Buffer(response.data, 'binary').toString('base64'))
}
