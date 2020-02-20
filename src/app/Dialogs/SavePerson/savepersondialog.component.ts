import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-saveperson-dialog',
  templateUrl: './savepersondialog.component.html',
  styleUrls: ['./savepersondialog.component.css'],
})

export class SavePersonDialogComponent implements OnInit {

    form: FormGroup;
    title: string;
    description: string;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<SavePersonDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
            this.description = data.PersonName;
        }

    ngOnInit() {
        this.form = this.fb.group({
            description: [this.description, []],
        });
    }

    save(){
        this.dialogRef.close(this.form.value);
    }

    close(){
        this.dialogRef.close();
    }

    onClick(): void {
      this.dialogRef.close();
    }
}


