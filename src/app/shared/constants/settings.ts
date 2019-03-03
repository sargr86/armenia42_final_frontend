import {environment} from '../../../environments/environment';

export const DEFAULT_COUNTRY = 'Armenia';
export const DEFAULT_ITEMS = ['world', 'countries', 'provinces', 'directions', 'locations', 'stories'];
export const DEFAULT_ACTIONS = ['edit', 'update', 'add'];
export const TEXTAREA_AUTOSIZE_MIN_ROWS = 5;
export const TEXTAREA_AUTOSIZE_MAX_ROWS = 10;
export const API_HOST = environment.apiHost;
export const UPLOADS_FOLDER = API_HOST + 'uploads/';
export const OTHER_UPLOADS_FOLDER = UPLOADS_FOLDER + 'others/';
