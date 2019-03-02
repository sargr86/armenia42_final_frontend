import {infoBox} from '../constants/info_box_data';

export default class FormInfoBoxData {
  static get(edit: boolean, lang: string, item: string) {
    let res;

    if (item !== 'story') {
      // Getting info box data, removing first item, because it relates only to English version of the system
      res = infoBox[edit ? 'itemEditing' : 'itemAdding'];
      if (lang !== 'en' && edit) {
        res = res.filter(n => n !== 'item_name_affects_folder_name');
      }
    }

    else {

    }


    return res;
  }
}
