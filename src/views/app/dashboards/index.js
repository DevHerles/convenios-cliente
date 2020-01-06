import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import analyticsDash from './analytics';

const Dashboards = ({ match }) => (
    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/default`} />
            <Route path={`${match.url}/default`} component={analyticsDash} />
            <Redirect to="/error" />

        </Switch>
    </div>
);
export default Dashboards;