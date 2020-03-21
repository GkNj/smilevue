const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = "这是个啥"
});

router.post('/register', async (ctx) => {
    console.log(ctx.request.body);
    ctx.body = ctx.request.body
});

module.exports = router;
