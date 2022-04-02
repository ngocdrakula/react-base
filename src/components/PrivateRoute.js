import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import NotFound from '../pages/NotFound';


class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { roles, user, children } = this.props;
        if (!roles?.length) return children;// không cần role
        if (user && !user.role) {//đang login local
            return (
                <>Loading</>
            );
        }
        if (!user) {//login local failed
            return (
                <NotFound />
            );
        }
        if (roles.includes(user.role)) {//co role
            return (children);
        }
        return (//không role
            <NotFound />
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})


export default withRouter(connect(mapStateToProps)(PrivateRoute));