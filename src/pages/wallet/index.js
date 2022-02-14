import React, { useState, useRef } from 'react';
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
  Modal,
  Tooltip,
  Drawer,
  Tabs,
} from 'antd';
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_1595958_p5529b5fjfr.js'],
});
import { connect } from 'dva';
import styles from './index.less';
import WalletList from './wallet-list';
const { confirm } = Modal;
const namespace = 'wallet';
const mapStateToProps = state => {
  let { wallet } = state[namespace];
  return {
    wallet,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getWalletFn: value => {
      dispatch({
        type: namespace + '/getWalletModel',
        value,
      });
    },
    getWalletListFn: value => {
      dispatch({
        type: namespace + '/getWalletListModel',
        value,
      });
    },
  };
};
const Wallet = props => {
  const [curTabKey, setCurTabKey] = useState('1');
  const dataRef = useRef('');
  const changeTabs = activeKey => {
    setCurTabKey(activeKey);
  };
  const [form] = Form.useForm();
  //查询条件
  const [objState, setObjState] = useState({
    start: '',
    end: '',
  });
  //选择日期
  const rangeConfig = {
    rules: [
      {
        type: 'array',
        required: false,
        message: '请选择时间',
      },
    ],
  };
  const checkDate = (date, dateStrings) => {
    setObjState({
      ...objState,
      start: dateStrings[0],
      end: dateStrings[1],
    });
  };

  const onFinish = values => {
    values = {
      ...values,
      ...objState,
    };
    dataRef.current = values;
    console.log('dataRef.current:', dataRef.current);
  };
  //重置
  const handleSearchReset = () => {
    form.resetFields();
    setObjState({
      ...objState,
      start: '',
      end: '',
    });
    dataRef.current = '';
  };

  return (
    <>
      <Row>
        <Col flex={2}>
          <div className={styles.wallet_box}>
            <div className={styles.title}>
              <div className={styles.left}>
                通用钱包
                <Tooltip placement="right" title="123">
                  <IconFont type="iconbangzhu" style={{ fontSize: '18px' }} />
                </Tooltip>
                <span className={styles.help}>充值帮助</span>
              </div>
              <Button type="primary" className={styles.right}>
                转入开票资金
              </Button>
            </div>
            <div className={styles.wallet_content}>
              <div className={styles.item}>
                <img src={require('../../assets/w-1.png')} />
                <div>
                  可用余额
                  <img src={require('../../assets/refresh1.png')} />
                  <h2>￥38337</h2>
                </div>
              </div>
              <div className={styles.item}>
                <img src={require('../../assets/w-2.png')} />
                <div>
                  冻结余额
                  <h2>￥38337</h2>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col flex={3}>
          <div className={styles.wallet_box}>
            <div className={styles.title}>
              <div className={styles.left}>
                {' '}
                税金现金余额
                <Tooltip placement="right" title="123">
                  <IconFont type="iconbangzhu" style={{ fontSize: '18px' }} />
                </Tooltip>
              </div>
            </div>
            <div className={styles.wallet_content}>
              <div className={styles.item}>
                <img src={require('../../assets/w-3.png')} />
                <div>
                  税金现金余额
                  <h2>￥38337</h2>
                </div>
              </div>
              <div className={styles.item}>
                <img src={require('../../assets/w-4.png')} />
                <div>
                  服务费现金余额
                  <h2>￥38337</h2>
                </div>
              </div>
              <div className={styles.item}>
                <img src={require('../../assets/w-5.png')} />
                <div>
                  奖励金余额
                  <h2>￥38337</h2>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          start: '',
          end: '',
        }}
        className={styles.wallet_search_form}
      >
        <Col span={6}>
          <Form.Item {...rangeConfig} label="交易时间">
            <RangePicker onChange={checkDate} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button htmlType="button" onClick={handleSearchReset}>
            重置
          </Button>
          <Button type="primary">导出</Button>
        </Col>
      </Form>
      <Tabs defaultActiveKey="1" onChange={changeTabs}>
        <TabPane tab="通用钱包交易记录" key="1">
          {curTabKey === '1' ? (
            <WalletList flag="list" data={dataRef.current} />
          ) : (
            <div></div>
          )}
        </TabPane>
        <TabPane tab="开票资金交易记录" key="2">
          {curTabKey === '2' ? (
            <WalletList flag="tax_list" data={dataRef.current} />
          ) : (
            <div></div>
          )}
        </TabPane>
      </Tabs>
    </>
  );
};
const memoWallet = React.memo(Wallet);
export default connect(mapStateToProps, mapDispatchToProps)(memoWallet);
