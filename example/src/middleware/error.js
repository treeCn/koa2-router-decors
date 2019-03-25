/*
 * @Description: 错误的中间件
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company: 
 * @LastEditors: 水痕
 * @Date: 2019-03-07 17:52:03
 * @LastEditTime: 2019-03-25 17:02:57
 */

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // 特殊判断由路由装饰器出来的错误
    if (err.required) {
      err['code'] = '412';
      err['msg'] = '缺少请求参数';
      err['desc'] = `${err.errors.join(',')} is required`;
    }
    /**将错误记录到日志文件中start**/
    console.log(JSON.stringify(err))
    /**将错误记录到日志文件中end**/
    // 返回错误的信息
    ctx.body = {
      code: 0,
      message: err.msg,
      desc: err.desc,
      data: {},
    };
  }
};