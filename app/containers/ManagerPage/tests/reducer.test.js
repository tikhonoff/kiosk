
import { fromJS } from 'immutable';
import managerPageReducer from '../reducer';

describe('managerPageReducer', () => {
  it('returns the initial state', () => {
    expect(managerPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
