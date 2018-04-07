import { createSelector } from 'reselect';

/**
 * Direct selector to the managerPage state domain
 */
const selectManagerPageDomain = (state) => state.get('managerPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ManagerPage
 */

const makeSelectManagerPage = () => createSelector(
  selectManagerPageDomain,
  (substate) => substate.toJS()
);

export default makeSelectManagerPage;
export {
  selectManagerPageDomain,
};
