import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import {
  Row,
  Col,
  Table,
  Button,
  Select,
  Form,
  Input,
  message,
  DatePicker,
  Switch,
  Modal,
  Popover,
  Tooltip,
  Drawer,
} from 'antd';
import { connect } from 'dva';
const namespace = 'carrierInfo';

const mapDispatchToProps = dispatch => {
  return {
    //承运人详情
    getCarrierInfoFn: value => {
      return dispatch({
        type: namespace + '/getCarrierInfoModel',
        value,
      });
    },
    //司机详情
    getDriverInfoFn: value => {
      return dispatch({
        type: namespace + '/getDriverInfoModel',
        value,
      });
    },
  };
};
const DetailMan = props => {
  let { carrier_uin, getCarrierInfoFn } = props;
  useEffect(() => {
    getCarrierInfoFn({ carrier_uin }).then(res => {});
  }, [carrier_uin]);
  return <></>;
};
const memoDetailMan = React.memo(DetailMan);
export default connect(null, mapDispatchToProps)(memoDetailMan);
