const koa = require('koa');
const app = new koa();

// 挂载全部的中间件
require('./middleware')(app);

app.listen(3000, () => {
	console.log('服务已经启动,请直接访问localhost:3000');
});