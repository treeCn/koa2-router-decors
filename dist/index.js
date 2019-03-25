"use strict";

var _interopRequireDefault3 = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireDefault2 = _interopRequireDefault3(require("@babel/runtime/helpers/interopRequireDefault"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.required = exports.all = exports.use = exports.put = exports.del = exports.post = exports.get = exports.controller = undefined;

var _router = require("./router");

var _router2 = (0, _interopRequireDefault2.default)(_router);

var _request = require("./request");

/*
 * @Description:
 * @Author: 水痕
 * @Github: https://github.com/kuangshp
 * @Email: 332904234@qq.com
 * @Company:
 * @LastEditors: 水痕
 * @Date: 2019-03-25 11:26:17
 * @LastEditTime: 2019-03-25 20:58:01
 */
exports.default = _router2.default;
exports.controller = _router.controller;
exports.get = _router.get;
exports.post = _router.post;
exports.del = _router.del;
exports.put = _router.put;
exports.use = _router.use;
exports.all = _router.all;
exports.required = _request.required;