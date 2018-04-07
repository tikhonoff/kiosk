/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const DEFAULT_ACTION = 'app/DEFAULT_ACTION';
export const LOAD_SLIDES_ACTION = 'app/LOAD_SLIDES_ACTION';

export const SLIDES_LOADED_ACTION = 'app/SLIDES_LOADED_ACTION';
export const SLIDES_LOAD_ERROR_ACTION = 'app/SLIDES_LOAD_ERROR_ACTION';
export const APPEND_NEW_SLIDE_ACTION = 'app/APPEND_NEW_SLIDE_ACTION';

