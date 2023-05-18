import React from 'react';
import { Switch , Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

/* PAGES */
import FrontIndex from './Views/Index';
import FrontLogin from './Views/Login';
import FrontRegister from './Views/Register';

import AdminIndex from './Views/Admin/Index';

const Main = (props) => (
    <Switch>
        <PrivateRoute exact path='/' component={FrontIndex}/>
        <Route path='/login' component={FrontLogin}/>
        <Route path='/register' component={FrontRegister}/>

        <PrivateRoute exact path='/admin' component={AdminIndex}/>
    </Switch>
);

export default Main;