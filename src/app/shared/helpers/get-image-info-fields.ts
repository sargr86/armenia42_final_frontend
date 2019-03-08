export default class ImageInfoFields {
  static get() {
    const lang = localStorage.getItem('lang') || 'en';
    const formFields = {
      lang: lang,
      translate: false,
      cover: false,
      coverItem: '',
      favorite: false,
      id: ''
    };
    formFields[`description_${lang}`] = '';

    return formFields;
  }
}
