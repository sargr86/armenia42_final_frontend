import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgxGalleryComponent, NgxGalleryOptions} from 'ngx-gallery';

@Component({
  selector: 'preview-gallery',
  templateUrl: './preview-gallery.component.html',
  styleUrls: ['./preview-gallery.component.scss']
})
export class PreviewGalleryComponent implements OnInit {
  @Input() galleryImages;
  @ViewChild('onlyPreviewGallery') onlyPreviewGallery: NgxGalleryComponent;
  prevGalleryOptions: NgxGalleryOptions[];

  constructor() {

    this.prevGalleryOptions = [
      {
        'image': false, 'thumbnails': false, 'width': '0px', 'height': '0px', 'previewKeyboardNavigation': true,
        'imageDescription': true, 'previewCloseOnEsc': true, 'previewFullscreen': true,
      },
      {'breakpoint': 500, 'width': '300px', 'height': '300px', 'thumbnailsColumns': 3},
      {'breakpoint': 300, 'width': '100%', 'height': '200px', 'thumbnailsColumns': 2}
    ];
  }

  ngOnInit() {
  }


  /**
   * Opens images preview
   * @param prevGallery
   */
  openPreview(prevGallery) {
    prevGallery.openPreview(0)
  }
}
