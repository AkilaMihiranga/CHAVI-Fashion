import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        const authData = window.localStorage.getItem('auth');
        if(authData){
            const auth = JSON.parse(authData);
            if(auth.hasOwnProperty('token') && auth.token !== '' && auth.user.userRole === 'admin'){
                return <Component {...props} />
            }else{
                return <Redirect to="/403-error" />
            }
        }else{
            return <Redirect to="/login" />
        }
        

    }} />
)

export default AdminRoute;