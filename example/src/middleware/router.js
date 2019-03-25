/*
 * @Description: 自定义路由中间件
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company:
 * @LastEditors: 水痕
 * @Date: 2019-03-23 10:52:43
 * @LastEditTime: 2019-03-25 21:15:27
 */
import { resolve } from 'path';
import Route from './../../../dist';
// 可以写到config中统一配置
const API_VERSION = '/api/v1';
/**
 * @Description: 反转路径的方法
 * @param {String} 
 * @return: 
 */
const dir = path => resolve(__dirname, path);

/**
 * @Description: 路由中间件读取controllers中的装饰器配置
 * @param {type} 
 * @return: 
 */
export default (app) => {
  const apiPath = dir('../controllers/*');
  const route = new Route(app, apiPath, API_VERSION);
  route.init();
};
