import React from 'react';
import { NavLink } from 'react-router-dom';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../App.css';

const LoginForm = (props) => {

    return (
        <>
        <Form
                    name="normal_login"
                    className="login-form"
                    style={{ marginTop: "50px"}}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={props.change}
                >
                    <Form.Item
                    name="email"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your email',
                        },
                    ]}
                    >
                    <Input 
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Email" 
                        style={{width: "400px"}}
                        />
                    </Form.Item>
                    <Form.Item
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your Password!',
                        },
                    ]}
                    >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        style={{width: "400px"}}
                    />
                    </Form.Item>
                    <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    </Form.Item>
            
                    <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}} className="login-form-button">
                        Log in 
                    </Button>
                     Or
                    <NavLink to="/register" style={{marginLeft: '10px'}}>Register</NavLink>
                    </Form.Item>
                </Form>
        </>
    )
}

export default LoginForm;