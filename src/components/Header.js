import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from "react-router-dom";
import { loginLocal, logout } from '../redux/actions/authentication';
import LoginModal from './Modals/LoginModal';



class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formType: false
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        console.log(dispatch)
        dispatch(loginLocal());
    }
    componentWillUnmount() {
        this.unlisten?.();
        window.removeEventListener('click', this.handleClickBody);
        this.unmount = true;
    }
    handleLogin = (e) => {
        e.preventDefault();
        this.setState({ formType: 'login' });
    }
    handleClose = () => {
        const { history, location } = this.props;
        if (location.pathname === "/login") {
            history.push("/");
        }
        else {
            this.setState({ formType: false });
        }
    }

    handleLogout = (e) => {
        e?.preventDefault(); 
        const { dispatch } = this.props;
        dispatch(logout())
    }
    render() {
        const { user, history } = this.props;
        const { formType } = this.state;

        const isAlwayVisibleLogin = history.location.pathname === "/login";
        const isAlwayVisibleRegister = history.location.pathname === "/register";
        const isAlwayVisibleForgotPassword = history.location.pathname === "/forgot-password";

        if (user?.username && (isAlwayVisibleLogin || isAlwayVisibleRegister || isAlwayVisibleForgotPassword)) return <Redirect to="/" />

        return (
            user?.username ?
                <div id="header" >
                    Hello {user.username}
                    <a href="/" onClick={this.handleLogout}>Đăng xuất</a>
                </div >
                :
                <div className="header">
                    <div id="topbar">
                        <Link to="/login" onClick={this.handleLogin}>Đăng nhập</Link>
                        <span className="log-space"> / </span>
                        <Link to="/register" onClick={this.handleRegister}>Đăng ký</Link>
                    </div>
                    <LoginModal
                        visible={formType === "login" || isAlwayVisibleLogin}
                        handleClose={this.handleClose}
                        handleRegister={this.handleRegister}
                        handleForgotPassword={this.handleForgotPassword}
                    />
                </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}

export default withRouter(connect(mapStateToProps)(Header));