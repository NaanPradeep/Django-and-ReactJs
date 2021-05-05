import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BaseRouter from './routes';
import {connect} from 'react-redux';
import * as action from './store/actions/auth';

import 'antd/dist/antd.css';
import CustomLayout from './containers/layout';

class App extends React.Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <>
        <Router>
        {/* <BaseRouter {...this.props} /> */}
        <CustomLayout {...this.props}>
            <BaseRouter />
        </CustomLayout>
      </Router>
    </>
    ) 
  }
}


const mapStateToProps = state => {
   return {
     isAuthenticated: state.authReducer.token !== null && state.authReducer.token !== undefined,
   }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(action.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
