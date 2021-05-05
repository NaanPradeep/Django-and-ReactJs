import React from 'react';
import { Form, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom';

const RegisterForm = (props) => {
    return (
        <>
            <Form
            {...props.layout}
            form={props.form}
            style={{marginTop: "50px", paddingLeft: "10px"}}
            name="register"
            onFinish={props.finish}
            scrollToFirstError
            >
                <Form.Item
                name="userName"
                label="User Name"
                rules={[
                {
                    required: true,
                    message: 'Please input your User Name',
                },
                ]}
            >
                <Input style={{width: "400px"}} />
            </Form.Item>
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input style={{width: "400px"}} />
            </Form.Item>

            <Form.Item 
            name="date"
            label="DatePicker"
            rules={[
            {
                type: 'date',
                message: 'Provided date is not valid',
            }
            ]}
            >
            <input type="date" id="start" name="trip-start"
                value="2018-07-22" />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password style={{width: "400px"}} />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password style={{width: "400px"}} />
            </Form.Item>


            <Form.Item {...props.tailLayout}>
                <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                    Register
                </Button>
                Or
                <NavLink style={{marginLeft: '10px'}} to="/login">
                    Login
                </NavLink>
            </Form.Item>
            </Form>
        </>
    )
}

export default RegisterForm;