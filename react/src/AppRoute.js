import React from 'react'
import { Route, Redirect } from 'react-router-dom'

/**
 * Custom route
 * @param Component "target page".
 * @param can "is allowed to show page".
 * @param redirect "if not allowed redirect him to".
 * @param rest "other props".
 */
const AppRoute = ({ component: Component, can = () => true, redirect, ...rest }) => (
    <Route {...rest} render = {(props) => (
        can() ? <Component {...props} /> : <Redirect to={redirect} />
    )} />
);

export default AppRoute;
