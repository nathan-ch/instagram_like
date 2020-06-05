import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { loginUser } from '../_Redux/_Authentication/Actions';
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Login = (props) => {

    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated)
    const dispatch = useDispatch()

    const onFinish = values => {
        dispatch(loginUser(values.username, values.password))
    };

    return (
        <div style={{ maxWidth: "300px", margin: "auto", marginTop: "10%" }}>
            <h1>Connexion</h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Se connecter
                    </Button>
                     Ou <Link to="/register">S'inscrire maintenant</Link>
                </Form.Item>
            </Form>
        </div>
    );
};
