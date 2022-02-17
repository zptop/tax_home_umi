const routes = [
  { path: '/login', component: './user/login.js' },
  { path: '/registed', component: './user/registed' },
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
          },
          {
            path: '/car/form',
            component: './car/form',
          },
          {
            path: '/car/pay',
            component: './car/pay',
          },
        ],
      },
      {
        path: '/ship',
        routes: [
          {
            path: '/ship/index',
            component: './ship/index',
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
          },
          {
            path: '/invoice/ship',
            component: './invoice/ship',
          },
          {
            path: '/invoice/carDetail',
            component: './invoice/carDetail',
          },
          {
            path: '/invoice/shipDetail',
            component: './invoice/shipDetail',
          },
        ],
      },
      {
        path: '/apply',
        routes: [
          {
            path: '/apply/index',
            component: './apply/index',
          },
          {
            path: '/apply/audit-list',
            component: './apply/audit-list',
          },
          {
            path: '/apply/history',
            component: './apply/history',
          },
        ],
      },
      {
        path: '/wallet',
        routes: [
          {
            path: '/wallet/index',
            component: './wallet/index',
          },
          {
            path: '/wallet/coupon',
            component: './wallet/coupon',
          },
        ],
      },
      {
        path: '/carrierInfo',
        routes: [
          {
            path: '/carrierInfo/index',
            component: './carrierInfo/index',
          },
          {
            path: '/carrierInfo/driver-admin',
            component: './carrierInfo/driver-admin',
          },
          {
            path: '/carrierInfo/vehicle-admin',
            component: './carrierInfo/vehicle-admin',
          },
        ],
      },
    ],
  },
];
export default routes;
