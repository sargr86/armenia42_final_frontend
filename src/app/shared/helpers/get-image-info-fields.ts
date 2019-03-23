export default class ImageInfoFields {
  static get() {
    const lang = localStorage.getItem('lang') || 'en';
    const formFields = {
      lang: lang,
      year: '',
      translate: 0,
      cover: 0,
      coverItem: '',
      fav: 0,
      id: '',
      with_file: 0
    };
    formFields[`description_${lang}`] = '';

    return formFields;
  }
}
