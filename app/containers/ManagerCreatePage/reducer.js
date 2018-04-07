/*
 *
 * ManagerCreatePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_TITLE_ACTION,
  CHANGE_PARENT_ACTION,
  CHANGE_ICON_ACTION,
  CHANGE_CONTENT_ACTION,
  CHANGE_INTERNAL_IDENT_ACTION,
} from './constants';

const initialState = fromJS({
  title: '',
  parent: '',
  icon: null,
  content: '',
  internalIdent: '',
});

function managerCreatePageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INTERNAL_IDENT_ACTION:
      return state.set('internalIdent', action.internalIdent);
    case CHANGE_CONTENT_ACTION:
      return state.set('content', action.content);
    case CHANGE_PARENT_ACTION:
      return state.set('parent', action.parent);
    case CHANGE_TITLE_ACTION:
      return state.set('title', action.title);
    case CHANGE_ICON_ACTION:
      return state.set('icon', action.icon);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default managerCreatePageReducer;
