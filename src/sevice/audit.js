import request from '../util/request';

/**获取发票列表 */
export async function paymentRequestList(params, url) {
  return request(url, {
    method: 'GET',
    params,
  });
}

/**付款申请跟踪 */
export async function paymentHistoryList(params) {
  return request('/apply/history_list', {
    method: 'GET',
    params,
  });
}

/**付款申请申批--审核(通过或不通过)*/
export async function auditUpdate(params) {
  return request('/apply/audit_update', {
    method: 'GET',
    params,
  });
}
