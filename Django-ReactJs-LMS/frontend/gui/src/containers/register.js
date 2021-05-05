import React from 'react';
import { Form, Spin } from 'antd';
import { Redirect } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';
import RegisterForm from './RegisterForm';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Registration = (props) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {

    props.onAuth(
        values.userName,
        values.email,
        values.date,
        values.password,
        values.confirm
        )
  };

  let errorMessage = null;
  if(props.error) {
      errorMessage = (
          <p>{props.error.message}</p>
      )
  }

  return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        {errorMessage}
        {props.loading === true ?
          <div style={{marginTop: "300px"}}>
          <Spin size="large" />
        </div>
        : 
          props.token === null ?
          <RegisterForm finish={onFinish} 
                      form={form} 
                      layout={formItemLayout} 
                      tailLayout={tailFormItemLayout}
                      />
        :
        <Redirect to="/" />
        }
        
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token,
        loading: state.authReducer.loading,
        error: state.authReducer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth : (userName, email, date, password1, password2) => dispatch(actions.authRegister(
                                                                                userName, 
                                                                                email, 
                                                                                date,
                                                                                password1,
                                                                                password2
                                                                                ))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);