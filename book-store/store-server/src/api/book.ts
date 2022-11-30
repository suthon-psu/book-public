import Router from 'koa-router'
import db from '../db'
import { flattenId, nestObject } from './utils'
const router = new Router()

const makeQuery = () => db('book').select('book.*', 'category.title as categoryTitle')
                          .leftJoin('category', 'book.categoryId', 'category.id')
const findById = (id: number) => makeQuery().where({'book.id': id})

router
  .get('/', async (ctx, next) => {     
    let query = makeQuery()
    if(ctx.request.query['categoryId']){
      const categoryId = Number(ctx.request.query['categoryId'])
      query = query.where({categoryId})
    }
    const books = await query.orderBy('id')
    ctx.body = books.map(it => nestObject(it, 'category'))
  })
  .get('/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const book = await findById(id).first()
    if(!book){
      ctx.response.status = 404
      return
    }
    ctx.body = nestObject(book, 'category')
  })
  .post('/', async (ctx, next) => {    
    let data = ctx.request.body
    data = flattenId(data, 'category')
    const id = (await db('book').insert(data))[0]
    ctx.body = nestObject(await findById(id).first(), 'category')
  })
  .put('/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    delete ctx.request.body.id
    let data = ctx.request.body
    data = flattenId(data, 'category')
    const rowUpdated = await db('book').where({id}).update(data)
    if(rowUpdated == 0){
      ctx.response.status = 404
      return
    }
    ctx.body = nestObject(await findById(id).first(), 'category')
  })
  .del('/:id', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const rowUpdated = await findById(id).del()
    ctx.body = {statusCode: rowUpdated > 0 ? 1 : 0}
  })


export default router