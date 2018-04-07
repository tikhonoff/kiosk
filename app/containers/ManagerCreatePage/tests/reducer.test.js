
import { fromJS } from 'immutable';
import managerCreatePageReducer from '../reducer';

describe('managerCreatePageReducer', () => {
  it('returns the initial state', () => {
    expect(managerCreatePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
