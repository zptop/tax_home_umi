'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _umiRequest = require('umi-request');

var _antd = require('antd');

var _config = _interopRequireDefault(require('../../config/config'));

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

var codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

var errorHandler = function errorHandler(error) {
  var response = error.response;

  if (response && response.status != 200) {
    var errorText = codeMessage[response.status] || response.statusText;
    var status = response.status,
      url = response.url;

    _antd.notification.error({
      message: '\u8BF7\u6C42\u9519\u8BEF '.concat(status, ': ').concat(url),
      description: errorText,
    });
  }

  return response;
};

var request = (0, _umiRequest.extend)({
  prefix: _config['default'].baseUrl.dev,
  errorHandler: errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
}); // request拦截器, 改变url 或 options.

request.interceptors.request.use(function _callee(url, options) {
  var c_token, headers, _headers;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          c_token = localStorage.getItem('x-auth-token');

          if (!c_token) {
            _context.next = 6;
            break;
          }

          headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Accept: 'application/json',
            'Access-WR-Token': c_token,
          };
          return _context.abrupt('return', {
            url: url,
            options: _objectSpread({}, options, {
              headers: headers,
            }),
          });

        case 6:
          _headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Accept: 'application/json',
            'Access-WR-Token': c_token,
          };
          return _context.abrupt('return', {
            url: url,
            options: _objectSpread({}, options),
          });

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  });
}); // response拦截器, 处理response

request.interceptors.response.use(function(response, options) {
  var token = response.headers.get('x-auth-token');

  if (token) {
    localStorage.setItem('x-auth-token', token);
  }

  return response;
});
var _default = request;
exports['default'] = _default;
