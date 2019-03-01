import {DropzoneConfigInterface} from "ngx-dropzone-wrapper";

export const USER_PROFILE_IMG_DROPZONE_CONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: '{not_provided}',
    maxFilesize: 1,
    acceptedFiles: 'image/*',
    autoProcessQueue: false,
    uploadMultiple: false,
    maxFiles: 1,
    addRemoveLinks: true
};


export const ITEM_IMG_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: '{not_provided}',
  maxFilesize: 1,
  acceptedFiles: 'image/*',
  autoProcessQueue: false,
  uploadMultiple: false,
  maxFiles: 1,
  addRemoveLinks: true
};
