import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'; 
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom' 
import LoginForm from '../Forms/LoginForm'; 
import { login } from '../../redux/actions/authentication';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false }
    }

    handleSubmit = (values, { setSubmitting, setFieldError }) => {
        const { dispatch, handleClose } = this.props;
        this.setState({ loading: true })
        setSubmitting(true);
        dispatch(login(values, res => {
            if (res?.code === 200) {
                handleClose();
            }
            else {
                setFieldError(res?.error?.field || "username", res?.message || "Sai tên đăng nhập hoặc mật khẩu")
                setSubmitting(false);
            }
        }))

    }
    render() {
        const { visible, handleClose, handleRegister, handleForgotPassword } = this.props;
        const { loading } = this.state;
        return (
            <Modal id="LoginModal" dialogClassName='modal-wrap' show={visible} onHide={handleClose} >
                <div className="login-form">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <div className="login-detail">
                                <Link to="/" className="login-logo"><img alt="" src="/images/logo.png" /></Link>
                                <h3>Đăng nhập</h3>
                                <LoginForm
                                    handleSubmit={this.handleSubmit}
                                    loading={loading}
                                    handleRegister={handleRegister}
                                    handleForgotPassword={handleForgotPassword}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.auth.user
    };
}

export default withRouter(connect(mapStateToProps)(Login));