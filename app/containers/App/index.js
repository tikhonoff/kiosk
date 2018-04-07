/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';

import HomePage from 'containers/HomePage/Loadable';
import ManagerPage from 'containers/ManagerPage/Loadable';
import ManagerCreatePage from 'containers/ManagerCreatePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import saga from './saga';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/manager" component={ManagerPage} />
        <Route exact path="/manager/create" component={ManagerCreatePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

const withSaga = injectSaga({ key: 'app', saga });

export default compose(
  withSaga,
)(App);
