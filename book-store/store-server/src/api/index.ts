import Router from 'koa-router'
import category from './category'
import book from './book'

const apiRouter = new Router()

apiRouter.get('/api/greet', async (ctx, next) => {
  ctx.body = {msg: 'Hello world.'}
})
  
apiRouter.use('/api/category', category.routes())
apiRouter.use('/api/book', book.routes())

export default apiRouter