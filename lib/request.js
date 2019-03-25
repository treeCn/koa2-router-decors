/*
 * @Description: 
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company: 
 * @LastEditors: 水痕
 * @Date: 2019-03-25 11:27:47
 * @LastEditTime: 2019-03-25 17:31:39
 */
import R from 'ramda';

import { convert } from './utils';

/**
 * @Description: 请求参数的装饰器
 * @param {type} 
 * @return: 
 */
export const required = rules => convert(async (ctx, next) => {
  let errors = [];
  const passRules = R.forEachObjIndexed(
    (value, key) => {
      errors = R.filter(i => !R.has(i, ctx.request[key]))(value);
    }
  );
  passRules(rules);

  if (errors.length) {
    throw {
      'required': true,
      'errors': errors
    }
  }
  await next();
});
