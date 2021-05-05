import React from 'react';
import {Route} from 'react-router-dom';
import Login from './containers/login';
import Register from './containers/register';
import AssignmentList from './containers/assignmentLists';
import AssignmentDetail from './containers/assignmentDetail';
import HomePage from './containers/HomePage';
import ProfilePage from './containers/Profile';
import Performance from './containers/Performance';

const BaseRouter = () => {
    return <>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/assignments' component={AssignmentList} />
        <Route exact path='/assignments/:ID' component={AssignmentDetail} />
        <Route exact path='/assessment-performance' component={Performance} />
    </>
}

export default BaseRouter;