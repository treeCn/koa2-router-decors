import cors from './cors';
import router from './router';
import error from './error';

module.exports = (app) => {
  // 使用跨域
  app.use(cors);
  app.use(error);
  router(app); // 加载路由中间件
};