const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const serve = require('koa-static')
const mount = require('koa-mount')
const nunjucks = require('nunjucks')
const path = require('path')
const fs = require('mz/fs')

const app = new Koa()

const router = new Router()

router.get('/', async ctx => {
  await ctx.render('index.njk', {
    title: '你好'
  })
})


app.use(mount('/static', serve(__dirname + '/assets')))
app.use(views(__dirname + '/views', { 
  map: {
    njk: 'nunjucks' 
  }
}))

app.use(async (ctx, next) => {
  const manifest = await fs.readFile(path.resolve(__dirname, 'assets/bundles/manifest.json'))
  ctx.state = {
    static: JSON.parse(manifest.toString())
  }
  await next()
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8080, function () {
  console.log('server is running')
})