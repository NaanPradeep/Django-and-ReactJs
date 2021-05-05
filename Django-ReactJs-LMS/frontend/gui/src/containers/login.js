import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../store/actions/auth';

import { Spin } from 'antd';
import '../App.css';
import LoginForm from './loginForm';


class Login extends React.Component {

    onFinish = (values) => {
        this.props.onAuth(values.email, values.password)
    };
    
    render() {
        let errorMessage = null;
        if(this.props.error !== null) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                {this.props.loading === true ?
                    <div style={{marginTop: "300px"}}>
                        <Spin size="large" />
                    </div>
                  : this.props.token === null ?
                    <LoginForm change={this.onFinish} />
                :  this.props.error !== null?
                <div style={{ marginTop: "50px"}}>
                <h6 style={{textAlign: "center", color: "red"}}>Invalid Credentials</h6>
                    <LoginForm change={this.onFinish} />
                </div>
                :
                 <Redirect to="/" />
                }
            </div>
          
        );
    }

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
        onAuth: (email, password) => dispatch(actions.authLogin(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);