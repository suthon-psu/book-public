import Koa from 'koa'
import json from 'koa-json'
import { koaBody } from 'koa-body'
import cors from '@koa/cors'

import loadFixtures from './fixtures'
import apiRouter from './api'
import appConfig from './config'

const app = new Koa()

app.use(json())
app.use(cors())
app.use(koaBody())

app.use(apiRouter.routes())

app.listen(8000)

loadFixtures(appConfig.clearDataBeforeLodingFixture)