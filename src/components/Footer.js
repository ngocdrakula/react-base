import React, { Component } from 'react';
import { connect } from 'react-redux';


class Footer extends Component {
    render() {
        const { user } = this.props;
        return (
            <div id="footer">
                Footer
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user
    };
}

export default connect(mapStateToProps)(Footer);