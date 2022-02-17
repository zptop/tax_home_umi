import request from '../util/request';

/**获取承运人列表 */
export async function getCarrierList(params, url) {
  return request(url, {
    method: 'GET',
    params,
  });
}

/**获取承运人详情*/
export async function getCarrierInfo(params) {
  return request('/carrierInfo/getCarrierInfo', {
    method: 'GET',
    params,
  });
}

/**编辑承运人*/
export async function editCarrier(data) {
  return request('/carrierInfo/editCarrier', {
    method: 'POST',
    data,
    responseType: 'form',
  });
}

/**删除或撤回承运人*/
export async function delOrRejectCarrier(params, url) {
  return request(url, {
    method: 'GET',
    params,
  });
}

/**新增车队老板*/
export async function addCarrierBoss(data) {
  return request('/carrierInfo/addCarrierBoss', {
    method: 'POST',
    data,
    responseType: 'form',
  });
}

/**新增车个体司机*/
export async function addCarrierDriver(data) {
  return request('/carrierInfo/addCarrierDriver', {
    method: 'POST',
    data,
    responseType: 'form',
  });
}

/**新增司机*/
export async function addDriver(data) {
  return request('/carrierInfo/addDriver', {
    method: 'POST',
    data,
    responseType: 'form',
  });
}

/**获取司机详情*/
export async function getDriverInfo(params) {
  return request('/carrierInfo/getDriverInfo', {
    method: 'GET',
    params,
  });
}

/**获取司机列表*/
export async function getDriverList(params) {
  return request('/carrierInfo/getDriverList', {
    method: 'GET',
    params,
  });
}

/**编辑司机*/
export async function editDriver(data) {
  return request('/carrierInfo/editDriver', {
    method: 'POST',
    data,
    responseType: 'form',
  });
}

/**删除或撤回司机*/
export async function delOrRejectDriver(params, url) {
  return request(url, {
    method: 'GET',
    params,
  });
}

/**新增车辆*/
export async function addVehicle(data) {
  return request('/carrierInfo/addVehicle', {
    method: 'POST',
    data,
    responseType: 'form',
  });
}

/**获取车辆详情*/
export async function getVehicleInfo(params) {
  return request('/carrierInfo/getVehicleInfo', {
    method: 'GET',
    params,
  });
}

/**获取车辆列表*/
export async function getVehicleList(params) {
  return request('/carrierInfo/getVehicleList', {
    method: 'GET',
    params,
  });
}

/**编辑车辆*/
export async function editVehicle(data) {
  return request('/carrierInfo/editVehicle', {
    method: 'POST',
    data,
    responseType: 'form',
  });
}

/**删除或撤回车辆*/
export async function delOrRejectVehicle(params, url) {
  return request(url, {
    method: 'GET',
    params,
  });
}

/**获取已审核的车辆列表（各种状态）*/
export async function getVehicleAuditList(params) {
  return request('/carrierInfo/getVehicleAuditList', {
    method: 'GET',
    params,
  });
}
