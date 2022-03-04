'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _user = require('../sevice/user');

var _antd = require('antd');

var _umi = require('umi');

var _push = _interopRequireDefault(require('../util/push'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var _default = {
  namespace: 'user',
  state: {
    isLogin: window.localStorage.getItem('token') === null ? false : true,
    userInfo: {},
    access: [],
  },
  reducers: {
    setUserInfo: function setUserInfo(state, action) {
      return _objectSpread({}, state, {
        userInfo: action.payload.data,
        access: action.payload.access,
      });
    },
  },
  effects: {
    /**
     * @param {*} value 传参
     * @param {*} call  调用方法
     * @param {*} put   调用reducers中的方法
     */
    doLogin:
      /*#__PURE__*/
      regeneratorRuntime.mark(function doLogin(_ref, _ref2) {
        var value, call, put, res, userInfoData;
        return regeneratorRuntime.wrap(function doLogin$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                value = _ref.value;
                (call = _ref2.call), (put = _ref2.put);
                _context.next = 4;
                return call(_user.doLogin, value);

              case 4:
                res = _context.sent;

                if (!(res.code == 0)) {
                  _context.next = 15;
                  break;
                }

                _context.next = 8;
                return call(_user.checkLogin);

              case 8:
                userInfoData = _context.sent;
                _context.next = 11;
                return put({
                  type: 'setUserInfo',
                  payload: userInfoData,
                });

              case 11:
                localStorage.setItem('x-auth-token', userInfoData.token);
                setTimeout(function() {
                  _umi.history.push('/car/index');
                }, 300);
                _context.next = 16;
                break;

              case 15:
                _antd.message.warning({
                  content: res.msg,
                  duration1: duration1,
                  onClose: function onClose() {
                    _umi.history.push('/'.concat((0, _push['default'])()));
                  },
                });

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, doLogin);
      }),
    checkLogin:
      /*#__PURE__*/
      regeneratorRuntime.mark(function checkLogin(_ref3, _ref4) {
        var value, call, put, userInfoData;
        return regeneratorRuntime.wrap(function checkLogin$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                value = _ref3.value;
                (call = _ref4.call), (put = _ref4.put);
                _context2.next = 4;
                return call(_user.checkLogin);

              case 4:
                userInfoData = _context2.sent;

                if (!(userInfoData.code == 0)) {
                  _context2.next = 10;
                  break;
                }

                _context2.next = 8;
                return put({
                  type: 'setUserInfo',
                  payload: userInfoData,
                });

              case 8:
                _context2.next = 11;
                break;

              case 10:
                _antd.message.warning({
                  content: res.msg,
                  duration1: duration1,
                  onClose: function onClose() {
                    _umi.history.push('/'.concat((0, _push['default'])()));
                  },
                });

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, checkLogin);
      }),
    doreg:
      /*#__PURE__*/
      regeneratorRuntime.mark(function doreg(_ref5, _ref6) {
        var value, call, put, res;
        return regeneratorRuntime.wrap(function doreg$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                value = _ref5.value;
                (call = _ref6.call), (put = _ref6.put);
                _context3.next = 4;
                return call(_user.doreg, value);

              case 4:
                res = _context3.sent;

                if (res.code == 0) {
                  _antd.message.success({
                    content: res.msg || '注册成功',
                    duration: 1,
                    onClose: function onClose() {
                      _umi.history.push('/car/index');
                    },
                  });
                } else {
                  _antd.message.warning(res.msg);
                }

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, doreg);
      }),
  },
  subscriptions: {
    setup: function setup(_ref7) {
      var dispatch = _ref7.dispatch,
        history = _ref7.history;
      history.listen(function(_ref8) {
        var pathname = _ref8.pathname;
        console.log('pathname', pathname);
        dispatch({
          type: 'checkLogin',
        });
      });
    },
  },
};
exports['default'] = _default;
