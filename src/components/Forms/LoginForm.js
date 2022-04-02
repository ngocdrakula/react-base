import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Tên tài khoản không được để trống'),
    password: Yup.string().required('Mật khẩu không được để trống'),
});

export default class LoginForm extends Component {
    render() {
        const { handleSubmit, handleRegister, handleForgotPassword } = this.props;
        return (
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                    remember: true
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="login-username" >Username</label>
                            <Field
                                id="login-username"
                                name="username"
                                placeholder="Nhập username"
                                className="form-control input-username"
                            />
                            {errors.username ? <div className="login-error-message">{errors.username}</div> : ''}
                        </div>
                        <div>
                            <label htmlFor="login-password" className="for-password">Mật khẩu <small><a href="/forgot-password" onClick={handleForgotPassword}>Quên mật khẩu?</a></small></label>
                            <Field
                                id="login-password"
                                name="password"
                                className="form-control input-password"
                                placeholder="Nhập mật khẩu"
                                type="password"
                            />
                            {errors.password ? <div className="login-error-message">{errors.password}</div> : ''}
                        </div>
                        <div className="save-login">
                            <label className="for-checkbox">
                                <Field name="remember" type="checkbox" />
                                <span className="checkbox-checkmark" />
                                Ghi nhớ đăng nhập
                            </label>
                        </div>
                        <p><input type="submit" disabled={isSubmitting} className="btn-login" value={isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"} /></p>
                        <p className="login-register">Bạn chưa có tài khoản? <Link to="/register" onClick={handleRegister}>Đăng ký</Link></p>
                    </Form>
                )}
            </Formik>
        );
    }
}