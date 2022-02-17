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
import { accMul } from '../../util/tools';
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/font_1595958_p5529b5fjfr.js'],
});
import { connect } from 'dva';
import styles from './index.less';
import WalletList from './wallet-list';
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
    taxFundRechargeFn: value => {
      dispatch({
        type: namespace + '/taxFundRechargeModel',
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
  let ChildRef = React.createRef();
  //查询条件
  const [objState, setObjState] = useState({
    start: '',
    end: '',
    timeRest: new Date(),
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
    let { timeRest, ...otherObjState } = objState;
    values = {
      ...values,
      ...otherObjState,
    };
    dataRef.current = values;
    ChildRef.current.getList(values);
  };
  //重置
  const handleSearchReset = () => {
    form.resetFields();
    setObjState({
      ...objState,
      start: '',
      end: '',
      timeRest: new Date(),
    });
    dataRef.current = '';
    ChildRef.current.getList({});
  };

  //导出
  const exportParentFn = () => {
    ChildRef.current.exportFn(objState);
  };

  //充值帮助
  const [rechargeHelpFlag, setRechargeHelpFlag] = useState(false);

  //转入开票资金
  const [billingFundsFlag, setBillingFundsFlag] = useState(false);
  //充值开票金额
  const [amount, setAmount] = useState('');
  const changeVal = e => {
    setAmount(e.target.value);
  };
  const sureBillingFunds = () => {
    if (!amount || isNaN(amount)) {
      message.warning('请输入转入金额');
      return;
    } else if (amount > props.wallet.Available_amount_desc) {
      message.warning('您输入的金额大于钱包余额，无法充值');
      return;
    }
    props.taxFundRechargeFn({
      amount: accMul(amount, 100),
      reward_amount: 0,
    });
  };

  return (
    <>
      {props.wallet && (
        <Row>
          <Col flex={2}>
            <div className={styles.wallet_box}>
              <div className={styles.title}>
                <div className={styles.left}>
                  通用钱包
                  <Tooltip
                    placement="right"
                    title="线下打款后，平台财务将加款到通用钱包中，如需支付税金及服务费，需将通用钱包金额转至开票资金中;"
                  >
                    <IconFont
                      type="iconbangzhu"
                      style={{ fontSize: '18px', marginLeft: '6px' }}
                    />
                  </Tooltip>
                  <span
                    className={styles.help}
                    onClick={_ => setRechargeHelpFlag(true)}
                  >
                    充值帮助
                  </span>
                </div>
                <Button type="primary" onClick={_ => setBillingFundsFlag(true)}>
                  转入开票资金
                </Button>
              </div>
              <div className={styles.wallet_content}>
                <div className={styles.item}>
                  <img src={require('../../assets/w-1.png')} />
                  <div>
                    可用余额
                    <img
                      src={require('../../assets/refresh1.png')}
                      onClick={_ => props.getWalletFn()}
                    />
                    <h2>￥{props.wallet.available_amount_desc}</h2>
                  </div>
                </div>
                <div className={styles.item}>
                  <img src={require('../../assets/w-2.png')} />
                  <div>
                    冻结余额
                    <h2>￥{props.wallet.freeze_cashamount_desc}</h2>
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
                  开票资金
                  <Tooltip
                    placement="right"
                    title="通过通用钱包进行充值，用于支付税金及服务费的专项资金，税金扣取只会从税金现金余额扣除；服务费扣取优先从服务费现金余额扣除,不足部分再从奖励金余额扣除，若再不足，再从税金现金余额扣除！"
                  >
                    <IconFont
                      type="iconbangzhu"
                      style={{ fontSize: '18px', marginLeft: '6px' }}
                    />
                  </Tooltip>
                </div>
              </div>
              <div className={styles.wallet_content}>
                <div className={styles.item}>
                  <img src={require('../../assets/w-3.png')} />
                  <div>
                    税金现金余额
                    <h2>￥{props.wallet.tax_cash_amount_desc}</h2>
                  </div>
                </div>
                <div className={styles.item}>
                  <img src={require('../../assets/w-4.png')} />
                  <div>
                    服务费现金余额
                    <h2>￥{props.wallet.tax_svrfee_amount_desc}</h2>
                  </div>
                </div>
                <div className={styles.item}>
                  <img src={require('../../assets/w-5.png')} />
                  <div>
                    奖励金余额
                    <h2>￥{props.wallet.tax_reward_amount_desc}</h2>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
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
            <RangePicker key={objState.timeRest} onChange={checkDate} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button htmlType="button" onClick={handleSearchReset}>
            重置
          </Button>
          <Button type="primary" onClick={exportParentFn}>
            导出
          </Button>
        </Col>
      </Form>
      <Tabs defaultActiveKey="1" onChange={changeTabs}>
        <TabPane tab="通用钱包交易记录" key="1">
          {curTabKey === '1' ? (
            <WalletList flag="list" data={dataRef.current} onRef={ChildRef} />
          ) : (
            <div></div>
          )}
        </TabPane>
        <TabPane tab="开票资金交易记录" key="2">
          {curTabKey === '2' ? (
            <WalletList
              flag="tax_list"
              data={dataRef.current}
              onRef={ChildRef}
            />
          ) : (
            <div></div>
          )}
        </TabPane>
      </Tabs>
      {/**充值帮助 */}
      <Modal
        title="充值帮助"
        width={720}
        visible={rechargeHelpFlag}
        onCancel={_ => setRechargeHelpFlag(false)}
        footer={null}
      >
        <h4>1、充值方式</h4>
        <ul>
          <li>请汇款至以下账户充值</li>
          <li className={styles.bank_item}>
            <span className={styles.bank_span}>
              <img
                className={styles.bank_logo}
                src={require('../../assets/bank.png')}
              />
            </span>
            <div className={styles.bank_info}>
              <span>江苏物润船联网络股份有限公司</span>
              <span>开户银行:宁波银行股份有限公司苏州工业园支行</span>
              <span>银行账号:75250122000104949</span>
            </div>
          </li>
          <li>转账款项到账后，我司会在30分钟内完成加款；</li>
          <li>汇款请使用公司对公账户，否则无法正常充值；</li>
        </ul>
        <h4>2、到账时间</h4>
        <ul>
          <li>
            跨行转账到账时间支持工作日9:00-16:30；若超过1个工作日未到账，请致电0512-56308111；
          </li>
          <li>
            受跨行转账影响，资金无法实时到账，请确保账户内有足够资金保障业务正常开展
          </li>
        </ul>
        <h4>3、以下充值异常情况将进行短信通知：</h4>
        <ul>
          <li>线下充值功能暂停，无法完成充值；</li>
          <li>平台账户出现异常，无法完成充值；</li>
        </ul>
        <p style={{ color: 'rgba(136, 136, 136, 1)', marginTop: '15px' }}>
          异常情况发生后，我司将在1-3个工作日内操作退款
        </p>
      </Modal>

      {/**转入开票资金*/}
      <Modal
        title="转入开票资金"
        width={720}
        visible={billingFundsFlag}
        onCancel={_ => setBillingFundsFlag(false)}
        footer={[
          <Button type="primary" key="recharge" onClick={sureBillingFunds}>
            充值
          </Button>,
        ]}
      >
        {props.wallet && (
          <div className={styles.funds_content}>
            <div className={styles.title}>
              转入金额仅可用余支付税金及服务费，奖励金额仅用于抵扣服务费{' '}
            </div>
            <div className={styles.item}>
              通用钱包可用余额:
              <span>￥{props.wallet.available_amount_desc}</span>
            </div>
            <div className={styles.item}>
              开票钱包现金余额:<span> ￥{props.wallet.tax_amount_desc}</span>
            </div>
            <div className={styles.tips}>
              （税金现金余额{props.wallet.tax_cash_amount_desc}
              元，服务费现金余额{props.wallet.tax_svrfee_amount_desc}
              元，奖励金余额{props.wallet.tax_reward_amount_desc}元）{' '}
            </div>
            <div className={styles.item}>
              * 转入开票资金(元):
              <Input placeholder="请输入金额" onChange={changeVal} />
            </div>
            <div className={styles.tips_on}>
              (参与奖励金活动的账户充值完成后请联系商务完成开票资金转入和奖励金充值){' '}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
const memoWallet = React.memo(Wallet);
export default connect(mapStateToProps, mapDispatchToProps)(memoWallet);
