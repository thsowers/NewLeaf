import * as Koa from 'koa'
import * as Cors from '@koa/cors'
import * as Router from 'koa-router'
import * as Json from 'koa-json'
import * as Parser from 'koa-body'
import Monk from 'monk'

const app = new Koa()
const router = new Router()
const db = Monk('mongodb://localhost:27017/newleaf')
const positions = db.get('positions')

app.use(Json())
app.use(Parser())
app.use(Cors())
app.use(router.routes())
app.listen(3000)

router.put('/position/', async ctx => {
  ctx.body = await positions.insert(ctx.request.body)
})

router.post('/position/:id', async ctx => {
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
