import UserDao from '../dao/user';
import ApiError from '../lib/api_error';

class UserServer {
  async createUser(params) {
    try {
      return await UserDao.create(params);
    } catch (e) {
      throw e;
    }
  }

  // 根据用户id更改用户数据
  async updateUserById(params) {
    const { username } = params;
    if (!username) {
      throw new ApiError(500, '用户名或密码有误');
    }
    try {
      return await UserDao.updateUserById(params);
    } catch (e) {
      throw e;
    }
  }

  // 获取全部用户
  async getAllUser() {
    return await UserDao.getAllUser();
  }
}

export default new UserServer();