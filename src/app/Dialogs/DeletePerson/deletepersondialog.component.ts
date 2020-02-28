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

    title: string;
    deletePersonDialog = new FormGroup({
      NameOfPerson: new FormControl('')
    });

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<DeletePersonDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
            this.title = data.title;
        }

    save() {
        this.dialogRef.close(this.deletePersonDialog.value);
    }

    close() {
        this.dialogRef.close();
    }

    onClick(): void {
      this.dialogRef.close();
    }
}


