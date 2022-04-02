

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux'
import Routers from './routers';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          {Routers.map(({ sidebar, roles, component: Component, ...route }) => {
            return (
              <Route {...route} component={props => (
                <PrivateRoute roles={roles}>
                  <Component {...props} />
                </PrivateRoute>
              )}
              />
            )
          })}
        </Switch>
        <Footer />
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(App)

