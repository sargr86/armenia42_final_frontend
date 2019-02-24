import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
  ) { }

  ngOnInit() {
  }

    /**
     * Confirms selected action
     */
    confirm(){
        this.dialogRef.close(true);
    }

    /**
     * Cancels selected action
     */
    cancel() {
        this.dialogRef.close(false);
    }

}
