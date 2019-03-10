import {environment} from '../../../environments/environment';

export const DEFAULT_COUNTRY = 'Armenia';
export const DEFAULT_ITEMS = ['world', 'countries', 'provinces', 'directions', 'locations', 'stories'];
export const COVER_ITEMS = [
  {label_en: 'country', label_ru: 'государство', label_hy: 'պետություն', model: 'countries', value: ''},
  {label_en: 'province', label_ru: 'провинция', label_hy: 'մարզ/նահանգ', model: 'provinces', value: ''},
  {label_en: 'direction', label_ru: 'направление', label_hy: 'ուղղություն', model: 'directions', value: ''},
  {label_en: 'location', label_ru: 'местоположение', label_hy: 'տեղանք', model: 'locations', value: ''}
];
export const DEFAULT_ACTIONS = ['edit', 'update', 'add'];
export const TEXTAREA_AUTOSIZE_MIN_ROWS = 5;
export const TEXTAREA_AUTOSIZE_MAX_ROWS = 10;
export const API_HOST = environment.apiHost;
export const UPLOADS_FOLDER = API_HOST + 'uploads/';
export const OTHER_UPLOADS_FOLDER = UPLOADS_FOLDER + 'others/';
export const BREADCRUMB_PARTS = ['country', 'province', 'direction', 'location', 'story', 'image'];
