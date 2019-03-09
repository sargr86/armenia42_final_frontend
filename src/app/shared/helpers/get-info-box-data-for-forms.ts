import {infoBox} from '../constants/info_box_data';

export default class FormInfoBoxData {
  static get(edit: boolean, lang: string, item: string) {
    let res;

    if (item !== 'story') {
      const action = edit ? 'itemEditing' : 'itemAdding';

      // Getting info box data, removing first item, because it relates only to English version of the system
      res = infoBox[action];
      if (item === 'location') {
        res.unshift('location_name_unique');
      } else if (item === 'image') {
        res = infoBox['imageEditing'];
      }

    } else {
      res = infoBox[edit ? 'storyEditing' : 'storyAdding'];
    }

    if (lang !== 'en' && edit) {
      res = res.filter(n => n !== 'item_name_affects_folder_name');
    }

    return res;
  }
}
