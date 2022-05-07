import React, { useState, useRef } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

import List from './list';
const CarrierInfo = () => {
  const dataRef = useRef('');
  const [curTabKey, setCurTabKey] = useState('1');
  const changeTabs = activeKey => {
    setCurTabKey(activeKey);
  };

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={changeTabs}>
        <TabPane tab="全部" key="1">
          {curTabKey === '1' ? (
            <List
              flag="getCarrierList"
              driverAdmin="/carrierInfo/driver-admin"
              vehicleAdmin="/carrierInfo/vehicle-admin"
            />
          ) : (
            <div></div>
          )}
        </TabPane>
        <TabPane tab="待处理" key="2">
          {curTabKey === '2' ? (
            <List
              flag="getWaitCarrierList"
              driverAdmin="/carrierInfo/driver-admin"
              vehicleAdmin="/carrierInfo/vehicle-admin"
            />
          ) : (
            <div></div>
          )}
        </TabPane>
      </Tabs>
    </>
  );
};
const memoCarrierInfo = React.memo(CarrierInfo);
export default memoCarrierInfo;
