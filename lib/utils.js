/*
 * @Description: 
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company: 
 * @LastEditors: 水痕
 * @Date: 2019-03-25 11:45:40
 * @LastEditTime: 2019-03-25 11:46:33
 */
import _ from 'loadsh';

export const isArray = c => _.isArray(c) ? c : [c];

const decorate = (args, middleware) => {
	let [target, key, descriptor] = args;
	target[key] = isArray(target[key]);
	target[key].unshift(middleware);
	return descriptor;
};

export const convert = middleware => (...args) => decorate(args, middleware);