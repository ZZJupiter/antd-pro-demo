import React, { Component } from 'react';
import { connect } from 'dva';
import { Link , routerRedux} from 'dva/router';
import { Checkbox, Alert, Icon } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';
import {fakeAccountLogin} from '../../services/api';
import store from "../../index";
import { setAuthority } from '../../utils/authority';





const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  onTabChange = type => {
    this.setState({ type });
  };

  handleSubmit = (err, values) => {
    const { dispatch } = store;

    const response = fakeAccountLogin(values);
    response.then(value =>{
      console.log("result",value);
      if(value.code === 0){
        setAuthority("admin");
        dispatch(routerRedux.push('/'));
      }
    });

    // const { type } = this.state;
    // if (!err) {
    //   this.props.dispatch({
    //     type: 'login/login',
    //     payload: {
    //       ...values,
    //       type,
    //     },
    //   });
    // }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="Please Login">
            {login.status === 'error' &&
              login.type === 'account' &&
              !submitting &&
              this.renderMessage('账户或密码错误（admin/888888）')}
            <UserName name="userName" placeholder="admin/user" />
            <Password name="password" placeholder="888888/123456" />
          </Tab>
          {/* <Tab key="mobile" tab="手机号登录"> */}
          {/* {login.status === 'error' && */}
          {/* login.type === 'mobile' && */}
          {/*! submitting && */}
          {/* this.renderMessage('验证码错误')} */}
          {/* <Mobile name="mobile" /> */}
          {/* <Captcha name="captcha" /> */}
          {/* </Tab> */}
          <div>
            {/* <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}> */}
            {/* 自动登录 */}
            {/* </Checkbox> */}
            {/* <a style={{ float: 'right' }} href=""> */}
            {/* 忘记密码 */}
            {/* </a> */}
          </div>
          <Submit loading={submitting}>登录</Submit>
          {/* <div className={styles.other}> */}
          {/* 其他登录方式 */}
          {/* <Icon className={styles.icon} type="alipay-circle" /> */}
          {/* <Icon className={styles.icon} type="taobao-circle" /> */}
          {/* <Icon className={styles.icon} type="weibo-circle" /> */}
          {/* <Link className={styles.register} to="/user/register"> */}
          {/* 注册账户 */}
          {/* </Link> */}
          {/* </div> */}
        </Login>
      </div>
    );
  }
}
