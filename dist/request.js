"use strict";

var _interopRequireDefault3 = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireDefault2 = _interopRequireDefault3(require("@babel/runtime/helpers/interopRequireDefault"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.required = undefined;

var _regenerator = require("@babel/runtime/regenerator");

var _regenerator2 = (0, _interopRequireDefault2.default)(_regenerator);

var _asyncToGenerator2 = require("@babel/runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = (0, _interopRequireDefault2.default)(_asyncToGenerator2);

var _ramda = require("ramda");

var _ramda2 = (0, _interopRequireDefault2.default)(_ramda);

var _utils = require("./utils");

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

/**
 * @Description: 请求参数的装饰器
 * @param {type} 
 * @return: 
 */
var required = exports.required = function required(rules) {
  return (0, _utils.convert)(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator3.default)(
    /*#__PURE__*/
    _regenerator2.default.mark(function _callee(ctx, next) {
      var errors, passRules;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              errors = [];
              passRules = _ramda2.default.forEachObjIndexed(function (value, key) {
                errors = _ramda2.default.filter(function (i) {
                  return !_ramda2.default.has(i, ctx.request[key]);
                })(value);
              });
              passRules(rules);

              if (!errors.length) {
                _context.next = 5;
                break;
              }

              throw {
                'required': true,
                'errors': errors
              };

            case 5:
              _context.next = 7;
              return next();

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};