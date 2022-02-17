'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getCarrierList = getCarrierList;
exports.getCarrierInfo = getCarrierInfo;
exports.editCarrier = editCarrier;
exports.delOrRejectCarrier = delOrRejectCarrier;
exports.addCarrierBoss = addCarrierBoss;
exports.addCarrierDriver = addCarrierDriver;
exports.addDriver = addDriver;
exports.getDriverInfo = getDriverInfo;
exports.getDriverList = getDriverList;
exports.editDriver = editDriver;
exports.delOrRejectDriver = delOrRejectDriver;
exports.addVehicle = addVehicle;
exports.getVehicleInfo = getVehicleInfo;
exports.getVehicleList = getVehicleList;
exports.editVehicle = editVehicle;
exports.delOrRejectVehicle = delOrRejectVehicle;
exports.getVehicleAuditList = getVehicleAuditList;

var _request = _interopRequireDefault(require('../util/request'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**获取承运人列表 */
function getCarrierList(params, url) {
  return regeneratorRuntime.async(function getCarrierList$(_context) {
    while (1) {
      switch ((_context.prev = _context.next)) {
        case 0:
          return _context.abrupt(
            'return',
            (0, _request['default'])(url, {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context.stop();
      }
    }
  });
}
/**获取承运人详情*/

function getCarrierInfo(params) {
  return regeneratorRuntime.async(function getCarrierInfo$(_context2) {
    while (1) {
      switch ((_context2.prev = _context2.next)) {
        case 0:
          return _context2.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/getCarrierInfo', {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context2.stop();
      }
    }
  });
}
/**编辑承运人*/

function editCarrier(data) {
  return regeneratorRuntime.async(function editCarrier$(_context3) {
    while (1) {
      switch ((_context3.prev = _context3.next)) {
        case 0:
          return _context3.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/editCarrier', {
              method: 'POST',
              data: data,
              responseType: 'form',
            }),
          );

        case 1:
        case 'end':
          return _context3.stop();
      }
    }
  });
}
/**删除或撤回承运人*/

function delOrRejectCarrier(params, url) {
  return regeneratorRuntime.async(function delOrRejectCarrier$(_context4) {
    while (1) {
      switch ((_context4.prev = _context4.next)) {
        case 0:
          return _context4.abrupt(
            'return',
            (0, _request['default'])(url, {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context4.stop();
      }
    }
  });
}
/**新增车队老板*/

function addCarrierBoss(data) {
  return regeneratorRuntime.async(function addCarrierBoss$(_context5) {
    while (1) {
      switch ((_context5.prev = _context5.next)) {
        case 0:
          return _context5.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/addCarrierBoss', {
              method: 'POST',
              data: data,
              responseType: 'form',
            }),
          );

        case 1:
        case 'end':
          return _context5.stop();
      }
    }
  });
}
/**新增车个体司机*/

function addCarrierDriver(data) {
  return regeneratorRuntime.async(function addCarrierDriver$(_context6) {
    while (1) {
      switch ((_context6.prev = _context6.next)) {
        case 0:
          return _context6.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/addCarrierDriver', {
              method: 'POST',
              data: data,
              responseType: 'form',
            }),
          );

        case 1:
        case 'end':
          return _context6.stop();
      }
    }
  });
}
/**新增司机*/

function addDriver(data) {
  return regeneratorRuntime.async(function addDriver$(_context7) {
    while (1) {
      switch ((_context7.prev = _context7.next)) {
        case 0:
          return _context7.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/addDriver', {
              method: 'POST',
              data: data,
              responseType: 'form',
            }),
          );

        case 1:
        case 'end':
          return _context7.stop();
      }
    }
  });
}
/**获取司机详情*/

function getDriverInfo(params) {
  return regeneratorRuntime.async(function getDriverInfo$(_context8) {
    while (1) {
      switch ((_context8.prev = _context8.next)) {
        case 0:
          return _context8.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/getDriverInfo', {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context8.stop();
      }
    }
  });
}
/**获取司机列表*/

function getDriverList(params) {
  return regeneratorRuntime.async(function getDriverList$(_context9) {
    while (1) {
      switch ((_context9.prev = _context9.next)) {
        case 0:
          return _context9.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/getDriverList', {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context9.stop();
      }
    }
  });
}
/**编辑司机*/

function editDriver(data) {
  return regeneratorRuntime.async(function editDriver$(_context10) {
    while (1) {
      switch ((_context10.prev = _context10.next)) {
        case 0:
          return _context10.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/editDriver', {
              method: 'POST',
              data: data,
              responseType: 'form',
            }),
          );

        case 1:
        case 'end':
          return _context10.stop();
      }
    }
  });
}
/**删除或撤回司机*/

function delOrRejectDriver(params, url) {
  return regeneratorRuntime.async(function delOrRejectDriver$(_context11) {
    while (1) {
      switch ((_context11.prev = _context11.next)) {
        case 0:
          return _context11.abrupt(
            'return',
            (0, _request['default'])(url, {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context11.stop();
      }
    }
  });
}
/**新增车辆*/

function addVehicle(data) {
  return regeneratorRuntime.async(function addVehicle$(_context12) {
    while (1) {
      switch ((_context12.prev = _context12.next)) {
        case 0:
          return _context12.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/addVehicle', {
              method: 'POST',
              data: data,
              responseType: 'form',
            }),
          );

        case 1:
        case 'end':
          return _context12.stop();
      }
    }
  });
}
/**获取车辆详情*/

function getVehicleInfo(params) {
  return regeneratorRuntime.async(function getVehicleInfo$(_context13) {
    while (1) {
      switch ((_context13.prev = _context13.next)) {
        case 0:
          return _context13.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/getVehicleInfo', {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context13.stop();
      }
    }
  });
}
/**获取车辆列表*/

function getVehicleList(params) {
  return regeneratorRuntime.async(function getVehicleList$(_context14) {
    while (1) {
      switch ((_context14.prev = _context14.next)) {
        case 0:
          return _context14.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/getVehicleList', {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context14.stop();
      }
    }
  });
}
/**编辑车辆*/

function editVehicle(data) {
  return regeneratorRuntime.async(function editVehicle$(_context15) {
    while (1) {
      switch ((_context15.prev = _context15.next)) {
        case 0:
          return _context15.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/editVehicle', {
              method: 'POST',
              data: data,
              responseType: 'form',
            }),
          );

        case 1:
        case 'end':
          return _context15.stop();
      }
    }
  });
}
/**删除或撤回车辆*/

function delOrRejectVehicle(params, url) {
  return regeneratorRuntime.async(function delOrRejectVehicle$(_context16) {
    while (1) {
      switch ((_context16.prev = _context16.next)) {
        case 0:
          return _context16.abrupt(
            'return',
            (0, _request['default'])(url, {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context16.stop();
      }
    }
  });
}
/**获取已审核的车辆列表（各种状态）*/

function getVehicleAuditList(params) {
  return regeneratorRuntime.async(function getVehicleAuditList$(_context17) {
    while (1) {
      switch ((_context17.prev = _context17.next)) {
        case 0:
          return _context17.abrupt(
            'return',
            (0, _request['default'])('/carrierInfo/getVehicleAuditList', {
              method: 'GET',
              params: params,
            }),
          );

        case 1:
        case 'end':
          return _context17.stop();
      }
    }
  });
}
