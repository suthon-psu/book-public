import { AuthData } from 'auth'
import Router from 'koa-router'
import db from '../db'
import { flattenId, nestObject } from './utils'
const router = new Router()

const makeQuery = () => db('userResult').select(
  'userResult.*',
  'announcement.topic as announcementTopic',
  'announcement.description as announcementDescription',
  'announcement.remarkIfPositive as announcementRemarkIfPositive',
  'announcement.remarkIfNegative as announcementRemarkIfNegative',
  'announcement.pubDateTime as announcementPubDateTime'
).leftJoin('announcement', 'userResult.announcementId', 'announcement.id')
const findById = (id: number) => makeQuery().where({ 'userResult.id': id })

router
  .get('/', async (ctx, next) => {
    const authData = ctx.state.authData as AuthData
    let query = makeQuery().where({ 'userResult.userCode': authData.username })
    if (ctx.request.query['announcementId']) {
      const announcementId = Number(ctx.request.query['announcementId'])
      query = query.where({ announcementId })
    }
    if (ctx.request.query['isPinned']) {
      const isPinned = Boolean(ctx.request.query['isPinned'])
      query = query.where({ isPinned })
    }
    if (ctx.request.query['keyword']) {
      const keyword = String(ctx.request.query['keyword'])
      query = query.where((it) => {it.where('announcement.topic', 'like', `%${keyword}%`).orWhere('announcement.description', 'like', `%${keyword}%`)})
    }
    const userResults = await query.orderBy('id', 'desc')
    ctx.body = userResults.map(it => nestObject(it, 'announcement'))
  })
  .get('/:id/markAsViewed', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const authData = ctx.state.authData as AuthData
    const rowUpdated = await db('userResult')
      .where({ id, 'userResult.userCode': authData.username })
      .update({ view_date_time: new Date() })
    if(rowUpdated == 0){
      ctx.response.status = 404
      return
    }
    ctx.body = {statusCode: 1}
  })
  .get('/:id/acknowledge', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const authData = ctx.state.authData as AuthData
    const rowUpdated = await db('userResult')
      .where({ id, 'userResult.userCode': authData.username })
      .update({ ack_date_time: new Date() })
    if(rowUpdated == 0){
      ctx.response.status = 404
      return
    }
    ctx.body = {statusCode: 1}
  })
  .get('/:id/toggleIsPinned', async (ctx, next) => {
    const id = parseInt(ctx.params.id)
    const authData = ctx.state.authData as AuthData
    let query = makeQuery().where({ 'userResult.userCode': authData.username })
    const userResult = await query.where({ 'userResult.id': id }).first()
    if (!userResult) {
      ctx.response.status = 404
      return
    }

    await db('userResult').where({ id }).update({ isPinned: userResult.isPinned ? false : true })
    ctx.body = nestObject(await findById(id).first(), 'announcement')
  })

export default router