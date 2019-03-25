/*
 * @Description: 定义一个路由装饰的类
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company: 
 * @LastEditors: 水痕
 * @Date: 2019-03-23 10:36:02
 * @LastEditTime: 2019-03-25 11:58:16
 */
import { resolve } from 'path';
import Router from 'koa-router';
import glob from 'glob';
import { isArray } from './utils';

const symbolPrefix = Symbol('prefix');
let routersMap = new Map();
/**
 * @Description:格式化path 
 * @param {type} 
 * @return: 
 */
const normalizePath = path => path.startsWith('/') ? path : `/${path}`;

/**
 * @Description: 路由的类
 */
export default class Route {
	constructor(app, apiPath, baseUrl = '') {
		this.app = app;
		this.apiPath = apiPath;
		this.router = new Router();
		this.baseUrl = baseUrl;
	}

	init() {
		glob.sync(resolve(this.apiPath, './*js')).forEach(require);
		for (let [conf, controller] of routersMap) {
			const controllers = isArray(controller);
			let prefixPath = conf.target[symbolPrefix];
			if (prefixPath) {
				prefixPath = normalizePath(prefixPath);
			}
			const routerPath = `${this.baseUrl}${prefixPath}${conf.path}`.replace(/(\/{2,})/g, '/');
			this.router[conf.method](routerPath, ...controllers);
		}
		this.app.use(this.router.routes());
		this.app.use(this.router.allowedMethods());
	}
}

/**
 * @Description: 往map中添加当前路由的方法
 * @param {type} 
 * @return: 
 */
const router = conf => (target, key) => {
	conf.path = normalizePath(conf.path);
	routersMap.set({
		target: target,
		...conf
	}, target[key]);
};

/**
 * @Description: 定义一个controller,传递到target的原型上
 * @param {String} 当前路径 
 * @return: 
 */
export const controller = path => target => target.prototype[symbolPrefix] = path;

/**定义几种请求方式start**/
export const get = path => router({
	method: 'get',
	path,
});

export const post = path => router({
	method: 'post',
	path,
});

export const put = path => router({
	method: 'put',
	path,
});

export const del = path => router({
	method: 'del',
	path,
});

/**定义几种请求方式end**/
