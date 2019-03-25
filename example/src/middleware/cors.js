/*
 * @Description: 设置跨域访问的中间件
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company: 
 * @LastEditors: 水痕
 * @Date: 2019-03-07 11:08:03
 * @LastEditTime: 2019-03-25 20:31:29
 */

const cors = require('koa2-cors');
export default async (ctx, next) => {
	cors({
		origin: function (ctx) {
			if (ctx.url === '/test') {
				return false;
			}
			return '*';
		},
		exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
		maxAge: 5,
		credentials: true,
		allowMethods: ['HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
		allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
	});
	await next();
};