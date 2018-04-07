/**
 *
 * Asynchronously loads the component for ManagerPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
