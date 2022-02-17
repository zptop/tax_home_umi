import request from '../util/request';

//获取通用钱包和开票资金额度
export async function getWallet(params) {
  return request('/wallet/get_wallet', {
    method: 'GET',
    params,
  });
}

//通用钱包交易记录,开票资金交易记录
export async function getWalletList(params, url) {
  return request(url, {
    method: 'GET',
    params,
  });
}

//转入开票资金，充值
export async function taxFundRecharge(params) {
  return request('/wallet/tax_fund_recharge', {
    method: 'GET',
    params,
  });
}

//优惠券列表
export async function getCouponList(params) {
  return request('/wallet/get_coupon', {
    method: 'GET',
    params,
  });
}
