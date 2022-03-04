import { doLogin, checkLogin, doreg } from '../sevice/user';
import { message } from 'antd';
import { history } from 'umi';
import routerPush from '../util/push';

export default {
  namespace: 'user',
  state: {
    isLogin: window.localStorage.getItem('token') === null ? false : true,
    userInfo: {},
    access: [],
  },
  reducers: {
    setUserInfo(state, action) {
      return {
        ...state,
        userInfo: action.payload.data,
        access: action.payload.access,
      };
    },
  },
  effects: {
    /**
     * @param {*} value 传参
     * @param {*} call  调用方法
     * @param {*} put   调用reducers中的方法
     */
    *doLogin({ value }, { call, put }) {
      const res = yield call(doLogin, value);
      if (res.code == 0) {
        const userInfoData = yield call(checkLogin);
        yield put({
          type: 'setUserInfo',
          payload: userInfoData,
        });
        localStorage.setItem('x-auth-token', userInfoData.token);
        setTimeout(() => {
          history.push('/car/index');
        }, 300);
      } else {
        message.warning({
          content: res.msg,
          duration1,
          onClose: () => {
            history.push(`/${routerPush()}`);
          },
        });
      }
    },

    *checkLogin({ value }, { call, put }) {
      const userInfoData = yield call(checkLogin);
      if (userInfoData.code == 0) {
        yield put({
          type: 'setUserInfo',
          payload: userInfoData,
        });
      } else {
        message.warning({
          content: res.msg,
          duration1,
          onClose: () => {
            history.push(`/${routerPush()}`);
          },
        });
      }
    },

    *doreg({ value }, { call, put }) {
      const res = yield call(doreg, value);
      if (res.code == 0) {
        message.success({
          content: res.msg || '注册成功',
          duration: 1,
          onClose: () => {
            history.push('/car/index');
          },
        });
      } else {
        message.warning(res.msg);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        console.log('pathname', pathname);
        dispatch({
          type: 'checkLogin',
        });
      });
    },
  },
};
