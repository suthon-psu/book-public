import Router from 'koa-router'
import db from '../db'
const router = new Router()

const makeQuery = () => db('category').select('*')
const findById = (id: number) => makeQuery().where({id})

router
  .get('/', async (ctx, next) => {            
    ctx.body = await makeQuery().orderBy('id')
  })
  .get('/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const category = await findById(id).first()
    if(!category){
      ctx.response.status = 404
      return
    }
    ctx.body = category
  })
  .post('/', async (ctx, next) => {    
    const result = await db('category').insert(ctx.request.body)
    if(result.length <= 0){
      ctx.response.status = 400
      return
    }
    const id = result[0]
    ctx.body = await findById(id).first()
  })
  .put('/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    delete ctx.request.body.id
    const rowUpdated = await findById(id).update(ctx.request.body)
    if(rowUpdated == 0){
      ctx.response.status = 404
      return
    }
    ctx.body = await findById(id).first()
  })
  .del('/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const rowUpdated = await findById(id).del()
    ctx.body = {statusCode: rowUpdated > 0 ? 1 : 0}
  })


export default router