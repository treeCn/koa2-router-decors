/*
 * @Description:定义用户的dao层
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company:
 * @LastEditors: 水痕
 * @Date: 2019-03-25 15:32:49
 * @LastEditTime: 2019-03-25 17:11:24
 */
import { dbsequelize } from '../config';
import BaseDao from '../lib/base-dao';
const UserModel = dbsequelize.import('./../models/user');

class UserDao extends BaseDao {
	constructor() {
		super();
	}
	async createUser(params) {
		try {
			const { username, mobile, email, password } = params;
			return await UserModel.create({
				username,
				mobile,
				email,
				password
			});
		} catch (e) {
			throw e;
		}
	}

	async updateUserById(params) {
		const { id, username, mobile, email, password } = params;
		const result = await UserModel.findById(id);
		return result.update({
			username: username ? username : result.username,
			mobile: mobile ? mobile : result.mobile,
			email: email ? email : result.email,
			password: password ? password : result.password,
		});
	}

	// 获取全部用户
	async getAllUser() {
		return await UserModel.findAll();
	}
}

export default new UserDao();