import { controller, get, post, required } from 'koa2-router-decors';
import BaseController from '../lib/base-controller';

import UserServer from '../servers/user/user-server';

@controller('/user')
export class UserController extends BaseController {
	constructor() {
		super();
	}
	/**
   * 
   * @api {post} /api/v1/user/create/ 添加用户
   * @apiDescription 创建用户的接口
   * @apiName createUser
   * @apiGroup users
   * @apiVersion  0.1.0
   * @apiParam {string} username="张三" 用户名
   * @apiParam {string} mobile 手机号码
   * @apiParam {string} email 邮箱
   * @apiParam {string} password 密码
   */
  @post('/create')
  @required({ body: ['username', 'mobile', 'password'] })
	async createUser(ctx) {
		const result = await UserServer.createUser(ctx.request.body);
		ctx.success(result);
	}

  @post('/update')
  async updateUserById(ctx) {
  	const result = await UserServer.updateUserById(ctx.request.body);
  	ctx.success(result);
  }

  /**
   * 
   * @api {get} /api/v1/user/list/ 获取全部的用户
   * @apiName getAllUser
   * @apiGroup users
   * @apiVersion  0.1.0
   * 
   */
  @get('/list')
  async getAllUser(ctx) {
  	try {
  		ctx.success(await UserServer.getAllUser());
  	} catch (e) {
  		console.error(e);
  	}
  }
}
