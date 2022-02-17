import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
const namespace = 'wallet';
const mapStateToProps = state => {
  let { couponList, couponCash, isExpired } = state[namespace];
  return { couponList, couponCash, isExpired };
};
const Coupon = props => {
  const renderList = arr => {
    return arr.map((item, index) => (
      <div className={styles.item}>
        <div
          className={
            item.is_valid != 1 ? styles.left : styles.left + ' ' + styles.spec
          }
        >
          {item.coupone_name}
        </div>
        <div className={styles.center}>
          <div>{item.usage_rule}</div>
          <div>{item.coupon_note}</div>
          <div className={styles.on}>有效日期至：{item.valid_time_desc}</div>
        </div>
        <div className={styles.right}>余{item.coupon_cnt}张</div>
        {item.is_valid == 0 && (
          <img src={require('../../assets/w_overdue.png')} />
        )}
      </div>
    ));
  };
  return (
    <>
      <div className={styles.coupon_list_content_title}>
        优惠券余额：<span>{props.couponCash}</span>元
        {props.isExpired && (
          <span className={styles.is_expired}>有优惠券即将过期</span>
        )}
      </div>
      {props.couponList.length > 0 ? (
        <div className={styles.coupon_list_content}>
          {renderList(props.couponList)}
        </div>
      ) : (
        <div className={styles.coupon_list_no_content}>
          <p>
            <img src={require('../../assets/w_zwyhj.png')} />
          </p>
          <p>暂无优惠券可用，下期活动期待您的参与！</p>
        </div>
      )}
      <div className={styles.coupon_tips}>
        <div>优惠券说明：</div>
        <p>
          1、优惠券一次只可使用一张，仅可抵扣服务费，抵扣金额不开服务费发票；
        </p>
        <p>
          2、优惠金额平摊到每个运单，若发生部分运单退回、作废、红冲，则享受的优惠金额不退，若整个申请单退回、作废、红冲，则优惠券退回；
        </p>
        <p>
          3、小规模纳税人征收率3%降为1%政策延长至2020-12-31，期间优惠券不可使用；
        </p>
        <p>4、优惠券活动不能与其他优惠活动共享；</p>
        <p>5、该活动最终解释权归物润船联所有。</p>
      </div>
    </>
  );
};
const memoCoupon = React.memo(Coupon);
export default connect(mapStateToProps, null)(memoCoupon);
