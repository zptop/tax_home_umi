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
