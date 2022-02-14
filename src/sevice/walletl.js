import request from '../util/request';

//获取通用钱包和开票资金额度
export async function getWallet(params) {
  return request('/wallet/get_wallet', {
    method: 'GET',
    params,
  });
}

export async function getWalletList(params) {
  return request('/wallet/get_list', {
    method: 'GET',
    params,
  });
}
