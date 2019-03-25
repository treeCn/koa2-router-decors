"use strict";

var _interopRequireDefault3 = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireDefault2 = _interopRequireDefault3(require("@babel/runtime/helpers/interopRequireDefault"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports.use = exports.del = exports.put = exports.post = exports.get = exports.controller = exports.default = undefined;

var _objectSpread2 = require("@babel/runtime/helpers/objectSpread");

var _objectSpread3 = (0, _interopRequireDefault2.default)(_objectSpread2);

var _toConsumableArray2 = require("@babel/runtime/helpers/toConsumableArray");

var _toConsumableArray3 = (0, _interopRequireDefault2.default)(_toConsumableArray2);

var _slicedToArray2 = require("@babel/runtime/helpers/slicedToArray");

var _slicedToArray3 = (0, _interopRequireDefault2.default)(_slicedToArray2);

var _classCallCheck2 = require("@babel/runtime/helpers/classCallCheck");

var _classCallCheck3 = (0, _interopRequireDefault2.default)(_classCallCheck2);

var _createClass2 = require("@babel/runtime/helpers/createClass");

var _createClass3 = (0, _interopRequireDefault2.default)(_createClass2);

var _path = require("path");

var _koaRouter = require("koa-router");

var _koaRouter2 = (0, _interopRequireDefault2.default)(_koaRouter);

var _glob = require("glob");

var _glob2 = (0, _interopRequireDefault2.default)(_glob);

var _utils = require("./utils");

/*
 * @Description: 定义一个路由装饰的类
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company: 
 * @LastEditors: 水痕
 * @Date: 2019-03-23 10:36:02
 * @LastEditTime: 2019-03-25 20:57:39
 */
var symbolPrefix = Symbol('prefix');
var routersMap = new Map();
/**
 * @Description:格式化path 
 * @param {type} 
 * @return: 
 */

var normalizePath = function normalizePath(path) {
  return path.startsWith('/') ? path : "/".concat(path);
};
/**
 * @Description: 路由的类
 */


var Route =
/*#__PURE__*/
function () {
  function Route(app, apiPath) {
    var baseUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    (0, _classCallCheck3.default)(this, Route);
    this.app = app;
    this.apiPath = apiPath;
    this.router = new _koaRouter2.default();
    this.baseUrl = baseUrl;
  }

  (0, _createClass3.default)(Route, [{
    key: "init",
    value: function init() {
      _glob2.default.sync((0, _path.resolve)(this.apiPath, './*js')).forEach(require);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = routersMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _this$router;

          var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
              conf = _step$value[0],
              _controller = _step$value[1];

          var controllers = (0, _utils.isArray)(_controller);
          var prefixPath = conf.target[symbolPrefix];

          if (prefixPath) {
            prefixPath = normalizePath(prefixPath);
          }

          var routerPath = "".concat(this.baseUrl).concat(prefixPath).concat(conf.path).replace(/(\/{2,})/g, '/');

          (_this$router = this.router)[conf.method].apply(_this$router, [routerPath].concat((0, _toConsumableArray3.default)(controllers)));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.app.use(this.router.routes());
      this.app.use(this.router.allowedMethods());
    }
  }]);
  return Route;
}();
/**
 * @Description: 往map中添加当前路由的方法
 * @param {type} 
 * @return: 
 */


exports.default = Route;

var router = function router(conf) {
  return function (target, key) {
    conf.path = normalizePath(conf.path);
    routersMap.set((0, _objectSpread3.default)({
      target: target
    }, conf), target[key]);
  };
};
/**
 * @Description: 定义一个controller,传递到target的原型上
 * @param {String} 当前路径 
 * @return: 
 */


var controller = exports.controller = function controller(path) {
  return function (target) {
    return target.prototype[symbolPrefix] = path;
  };
};
/**定义几种请求方式start**/


var get = exports.get = function get(path) {
  return router({
    method: 'get',
    path: path
  });
};

var post = exports.post = function post(path) {
  return router({
    method: 'post',
    path: path
  });
};

var put = exports.put = function put(path) {
  return router({
    method: 'put',
    path: path
  });
};

var del = exports.del = function del(path) {
  return router({
    method: 'del',
    path: path
  });
};

var use = exports.use = function use(path) {
  return router({
    method: 'use',
    path: path
  });
};

var all = exports.all = function all(path) {
  return router({
    method: 'all',
    path: path
  });
};
/**定义几种请求方式end**/