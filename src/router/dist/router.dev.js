'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;
var routes = [
  {
    path: '/login',
    component: './user/login.js',
  },
  {
    path: '/registed',
    component: './user/registed',
  },
  {
    path: '/',
    component: '../layouts',
    wrappers: ['@/wrappers/auth'],
    routes: [
      {
        path: '/car',
        routes: [
          {
            path: '/car/index',
            component: './car/index',
            title: '车辆运单',
          },
          {
            path: '/car/form',
            component: './car/form',
            title: '新增车辆运单',
          },
          {
            path: '/car/pay',
            component: './car/pay',
            title: '付款',
          },
        ],
      },
      {
        path: '/ship',
        routes: [
          {
            path: '/ship/index',
            component: './ship/index',
            title: '船舶运单',
          },
          {
            path: '/ship/form',
            component: './ship/form',
          },
        ],
      },
      {
        path: '/invoice',
        routes: [
          {
            path: '/invoice/car',
            component: './invoice/car',
            title: '车辆发票',
          },
          {
            path: '/invoice/ship',
            component: './invoice/ship',
            title: '船舶发票',
          },
          {
            path: '/invoice/carDetail',
            component: './invoice/carDetail',
            title: '车辆发票申请详情',
          },
          {
            path: '/invoice/shipDetail',
            component: './invoice/shipDetail',
            title: '船舶发票申请详情',
          },
        ],
      },
      {
        path: '/apply',
        routes: [
          {
            path: '/apply/index',
            component: './apply/index',
            title: '付款申请审批',
          },
          {
            path: '/apply/audit-list',
            component: './apply/audit-list',
          },
          {
            path: '/apply/history',
            component: './apply/history',
            title: '付款申请跟踪',
          },
        ],
      },
      {
        path: '/wallet',
        routes: [
          {
            path: '/wallet/index',
            component: './wallet/index',
            title: '企业钱包',
          },
          {
            path: '/wallet/coupon',
            component: './wallet/coupon',
            title: '我的优惠券',
          },
        ],
      },
      {
        path: '/carrierInfo',
        routes: [
          {
            path: '/carrierInfo/index',
            component: './carrierInfo/index',
            title: '司机管理',
          },
          {
            path: '/carrierInfo/driver-admin',
            component: './carrierInfo/driver-admin',
            title: '司机管理详情',
          },
          {
            path: '/carrierInfo/vehicle-admin',
            component: './carrierInfo/vehicle-admin',
            title: '车辆管理',
          },
        ],
      },
    ],
  },
];
var _default = routes;
exports['default'] = _default;
