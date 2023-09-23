import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}sample`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route path={`${match.url}security`} component={asyncComponent(() => import('./SecurityPage'))}/>
      <Route path={`${match.url}market`} component={asyncComponent(() => import('./MarketPage'))}/>
    </Switch>
  </div>
);

export default App;
