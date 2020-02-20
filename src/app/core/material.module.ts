import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatNativeDateModule, MatIconModule,
         MatSidenavModule, MatListModule, MatToolbarModule, 
         MatFormFieldModule, MatInputModule, MatGridListModule,
         MatSelectModule, MatDatepickerModule, MatButtonToggleModule,
         MatDialogModule} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatNativeDateModule,
            MatIconModule, MatSidenavModule, MatListModule,
            MatToolbarModule, MatFormFieldModule, MatInputModule,
            MatGridListModule, MatSelectModule, MatDatepickerModule,
            MatButtonToggleModule, MatDialogModule],

  exports: [CommonModule, MatButtonModule, MatNativeDateModule,
            MatIconModule, MatSidenavModule, MatListModule,
            MatToolbarModule, MatFormFieldModule, MatInputModule,
            MatGridListModule, MatSelectModule, MatDatepickerModule,
            MatButtonToggleModule, MatDialogModule],
})
export class CustomMaterialModule { }
