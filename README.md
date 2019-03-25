### 一、关于重复造轮子解释下
> 在[`npmjs`](https://www.npmjs.com/)上搜索关于`koa`路由装饰器的已经有那么几个包了,但是我从几个包中发现作者的思维仅仅限制于前端开发的思想,项目分层不明确,我们开发`kow-web`项目可以根据`java-web`中项目分层的思想来写项目,项目结构清晰明了,本人封装这个包也是参考了`java-web`开发过程中把项目分为四层架构。

* 1、`controllers`:路由的控制
* 2、`servers`:常用于一些业务逻辑的判断
* 3、`dao`:操作数据库的
* 4、`models`:关于建表的数据模型

### 二、关于`koa2-router-decors`包的使用步骤

* 1、构建一个项目,并创建分层目录
* 2、安装

  ```js
  npm install koa2-router-decors
  // or
  yarn add koa2-router-decors
  ```

* 3、在中间件中使用我们安装的包

  ```js
  import { resolve } from 'path';
  import Route from 'koa2-router-decors';
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
    // 这个地方是要读取的文件夹目录
    const apiPath = dir('../controllers/*');
    // 实例化类并调用方法
    const route = new Route(app, apiPath, API_VERSION);
    route.init();
  };
  ```

* 4、使用中间件

* 5、在`controllers`的文件夹中使用装饰器

  ```js
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
    ....
  }
  ```

* 6、具体代码可以参考`example`中写的

### 三、关于`example`代码跑起来的说明
* 1、使用的是`mysql`
* 2、`mysql`建表`sql`

  ```sql
  CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(30) NOT NULL,
    `mobile` varchar(11) DEFAULT NULL,
    `email` varchar(20) DEFAULT NULL,
    `password` varchar(255) NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8
  ```

* 3、在`example`的根目录下创建一个`.env`的文件

  ```js
  DB_HOST=数据库地址
  DB_USERNAME=数据库连接名
  DB_PASSWORD=数据库连接密码
  DB_DATABASE=数据库名
  ```