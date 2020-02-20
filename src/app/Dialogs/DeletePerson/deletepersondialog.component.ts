import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-deleteperson-dialog',
  templateUrl: './deletepersondialog.component.html',
  styleUrls: ['./deletepersondialog.component.css'],
})

export class DeletePersonDialogComponent {

    form: FormGroup;
    title: string;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<DeletePersonDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
            this.title = data.title;
        }

    // ngOnInit() {
    //     this.form = this.fb.group({
    //         description: [description, []],
    //     });
    // }

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


