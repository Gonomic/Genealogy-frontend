import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-saveperson-dialog',
  templateUrl: './savepersondialog.component.html',
  styleUrls: ['./savepersondialog.component.css'],
})

export class SavePersonDialogComponent implements OnInit {

    title: string;
    savePersonDialog = new FormGroup({
        NameOfPerson: new FormControl('')
      });
    description: string;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<SavePersonDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
            this.title = data.PersonName;
        }

    ngOnInit() {
        this.savePersonDialog = this.fb.group({
            description: [this.description, []],
        });
    }

    save(){
        this.dialogRef.close(this.savePersonDialog.value);
    }

    close(){
        this.dialogRef.close();
    }

    onClick(): void {
      this.dialogRef.close();
    }
}


