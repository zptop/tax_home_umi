import { getWallet, getWalletList, taxFundRecharge } from '../sevice/walletl';
export default {
  namespace: 'wallet',
  state: {
    wallet: null, //通用钱包,税金现金余额
    loading: false, //列表加载状态
    totalPage: 0, //总页数,
    wallet_list: [], //通用钱包交易记录列表
    wallet_tax_list: [], //开票资金交易记录列表
  },
  //同步方法
  reducers: {
    //loading状态
    setLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },

    //设置通用钱包,税金现金余额
    setWallet(state, action) {
      return {
        ...state,
        wallet: action.payload,
      };
    },

    //通用钱包交易记录-列表
    set_list(state, action) {
      let {
        payload: { data, total },
      } = action;
      return {
        ...state,
        wallet_list: data,
        totalPage: total,
      };
    },

    //开票资金交易记录-列表
    set_tax_list(state, action) {
      let {
        payload: { data, total },
      } = action;
      return {
        ...state,
        wallet_tax_list: data,
        totalPage: total,
      };
    },
  },
  //异步方法
  effects: {
    //获取通用钱包,税金现金余额
    *getWalletModel({ value }, { call, put }) {
      const res = yield call(getWallet, value);
      if (res.code == 0) {
        yield put({ type: 'setWallet', payload: res.data });
      } else {
        message.warning(res.msg);
      }
    },

    //获取通用钱包交易记录列表
    *getWalletListModel({ value }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
      const res = yield call(getWalletList, value, '/wallet/get_' + value.flag);
      if (res.code == 0) {
        yield put({ type: 'setLoading', payload: false });
        yield put({ type: 'set_' + value.flag, payload: res });
      } else {
        message.warning(res.msg);
      }
    },

    //转入开票资金-充值
    *taxFundRechargeModel({ value }, { call, put }) {
      const res = yield call({ taxFundRecharge, value });
      if (res.code == 0) {
        message.success(res.msg || '恭喜您，充值成功！');
      } else {
        message.warning(res.msg || '系统错误');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname == '/wallet/index') {
          dispatch({
            type: 'getWalletModel',
          });
        }
      });
    },
  },
};
