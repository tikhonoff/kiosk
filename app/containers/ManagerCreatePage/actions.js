/*
 *
 * ManagerCreatePage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_TITLE_ACTION,
  CHANGE_PARENT_ACTION,
  CHANGE_ICON_ACTION,
  CHANGE_CONTENT_ACTION,
  CHANGE_INTERNAL_IDENT_ACTION,
  SUBMIT_ACTION,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeTitleAction(title) {
  return {
    type: CHANGE_TITLE_ACTION,
    title,
  };
}

export function changeParentAction(parent) {
  return {
    type: CHANGE_PARENT_ACTION,
    parent,
  };
}

export function changeIconAction(icon) {
  return {
    type: CHANGE_ICON_ACTION,
    icon,
  };
}

export function changeContentAction(content) {
  return {
    type: CHANGE_CONTENT_ACTION,
    content,
  };
}

export function changeInternalIdentAction(internalIdent) {
  return {
    type: CHANGE_INTERNAL_IDENT_ACTION,
    internalIdent,
  };
}

export function submit() {
  return {
    type: SUBMIT_ACTION,
  };
}
