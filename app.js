const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const serve = require('koa-static')
const mount = require('koa-mount')
const nunjucks = require('nunjucks')

const app = new Koa()

const router = new Router()

router.get('/', async ctx => {
  await ctx.render('index.njk')
})


app.use(mount('/static', serve(__dirname + '/assets')))
app.use(views(__dirname + '/views', { 
  map: {
    njk: 'nunjucks' 
  }
}))
app.use(router.routes()).use(router.allowedMethods())

app.listen(8080, function () {
  console.log('server is running')
})