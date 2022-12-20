import { authMiddleware } from '../auth'
import Router from 'koa-router'
import announcement from './announcement'
import user_result from './user_result'


const apiRouter = new Router()

apiRouter.use('/api/announcement', authMiddleware, announcement.routes())
apiRouter.use('/api/userResult', authMiddleware, user_result.routes())

export default apiRouter