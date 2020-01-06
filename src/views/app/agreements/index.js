import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AgreementList from "./agreements";

const Agreement = ({ match }) => (
  <div className="dashboard-wrapper">
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={AgreementList} />
      <Route path={`${match.url}/:id`} component={AgreementList} />
      <Redirect to="/error" />
    </Switch>
  </div>
);
export default Agreement;
