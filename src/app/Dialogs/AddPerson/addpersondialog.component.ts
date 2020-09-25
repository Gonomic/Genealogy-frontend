import {Component, Inject, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-addperson-dialog',
  templateUrl: './addpersondialog.component.html',
  styleUrls: ['./addpersondialog.component.css'],
})

export class AddPersonDialogComponent {

    person: string;


    constructor(
        public dialogRef: MatDialogRef<AddPersonDialogComponent>,
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


