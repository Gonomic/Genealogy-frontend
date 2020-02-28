import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-deleteperson-dialog',
  templateUrl: './deletepersondialog.component.html',
  styleUrls: ['./deletepersondialog.component.css'],
})

export class DeletePersonDialogComponent {

    person: string;


    constructor(
        public dialogRef: MatDialogRef<DeletePersonDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
            this.person = data.PersonName;
        }

    save() {
        this.dialogRef.close('Save');
    }

    close() {
        this.dialogRef.close('Discard');
    }

    onClick(): void {
      this.dialogRef.close();
    }
}


