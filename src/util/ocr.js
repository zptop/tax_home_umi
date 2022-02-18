import request from './request';

export async function scanIdCard(params, url) {
  return request(url, {
    method: 'GET',
    params,
  });
}
