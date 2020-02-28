import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-saveperson-dialog',
  templateUrl: './savepersondialog.component.html',
  styleUrls: ['./savepersondialog.component.css'],
})

  export class SavePersonDialogComponent {
  
    person: string;


    constructor(
        public dialogRef: MatDialogRef<SavePersonDialogComponent>,
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


