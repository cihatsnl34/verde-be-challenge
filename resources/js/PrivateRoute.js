import React from 'react';
import { Redirect , Route , withRouter } from 'react-router-dom';
import AuthStore from './Store/AuthStore';
AuthStore.getToken();
const isLoggedIn = AuthStore.appState != null && AuthStore.appState.isLoggedIn;
const admin = AuthStore.appState != null && AuthStore.appState.role;

console.log(JSON.parse(JSON.stringify(AuthStore.appState)));
const PrivateRoute = ({
    component:Component,
    path,
    ...rest
}) => (
    <Route path={path} {...rest}
        render={
            props => isLoggedIn ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{ 
                    pathname:"/login",
                    state:{
                        prevLocation:path,
                        error:'Please login.'
                    }
                }}/>
            )
        } />
)
export default withRouter(PrivateRoute);