"use strict";

var _interopRequireDefault3 = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireDefault2 = _interopRequireDefault3(require("@babel/runtime/helpers/interopRequireDefault"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convert = exports.isArray = undefined;

var _slicedToArray2 = require("@babel/runtime/helpers/slicedToArray");

var _slicedToArray3 = (0, _interopRequireDefault2.default)(_slicedToArray2);

var _loadsh = require("loadsh");

var _loadsh2 = (0, _interopRequireDefault2.default)(_loadsh);

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
var isArray = exports.isArray = function isArray(c) {
  return _loadsh2.default.isArray(c) ? c : [c];
};

var decorate = function decorate(args, middleware) {
  var _args = (0, _slicedToArray3.default)(args, 3),
      target = _args[0],
      key = _args[1],
      descriptor = _args[2];

  target[key] = isArray(target[key]);
  target[key].unshift(middleware);
  return descriptor;
};

var convert = exports.convert = function convert(middleware) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return decorate(args, middleware);
  };
};