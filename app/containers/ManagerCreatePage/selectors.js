import { createSelector } from 'reselect';

/**
 * Direct selector to the managerCreatePage state domain
 */
const selectManagerCreatePageDomain = (state) => state.get('managerCreatePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManagerCreatePage
 */

const makeSelectManagerCreatePage = () => createSelector(
  selectManagerCreatePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManagerCreatePage;
export {
  selectManagerCreatePageDomain,
};
