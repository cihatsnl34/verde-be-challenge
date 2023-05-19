import React from 'react';
import { Switch , Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

/* PAGES */
import FrontIndex from './Views/Index';
import FrontLogin from './Views/Login';
import FrontRegister from './Views/Register';

import AdminIndex from './Views/Admin/Index';

import AdminEscapeRoomsIndex from './Views/Admin/EscapeRooms/index'
import AdminEscapeRoomsCreate from './Views/Admin/EscapeRooms/create'
import AdminEscapeRoomsEdit from './Views/Admin/EscapeRooms/edit'

import AdminUsers from './Views/Admin/User/index'
import AdminBooking from './Views/Admin/Bookings/bookingList'

import FrontEscape from './Views/EscapeRooms/escapeRooms'
import FrontSingleEscape from './Views/EscapeRooms/singleEscapeRoom'
import FrontBooking from './Views/EscapeRooms/bookingList'
const Main = (props) => (
    <Switch>
        <PrivateRoute exact path='/' component={FrontIndex}/>
        <Route path='/login' component={FrontLogin}/>
        <Route path='/register' component={FrontRegister}/>

        <PrivateRoute exact path='/escapeRoom' component={FrontEscape}/>
        <PrivateRoute path='/escapeRoom/:id' component={FrontSingleEscape}/>
        <PrivateRoute path='/booking' component={FrontBooking}/>

        <PrivateRoute exact path='/admin' component={AdminIndex}/>
        <PrivateRoute exact path='/admin/escapeRoom' component={AdminEscapeRoomsIndex}/>
        <PrivateRoute path='/admin/escapeRoom/create' component={AdminEscapeRoomsCreate}/>
        <PrivateRoute path='/admin/escapeRoom/edit/:id' component={AdminEscapeRoomsEdit}/>
        <PrivateRoute path='/admin/users' component={AdminUsers}/>
        <PrivateRoute path='/admin/bookings' component={AdminBooking}/>

        

    </Switch>
);

export default Main;