import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatNativeDateModule, MatIconModule,
         MatSidenavModule, MatListModule, MatToolbarModule, 
         MatFormFieldModule, MatInputModule, MatGridListModule,
         MatSelectModule, MatDatepickerModule, MatButtonToggleModule,
         MatDialogModule, MatCardModule} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatNativeDateModule,
            MatIconModule, MatSidenavModule, MatListModule,
            MatToolbarModule, MatFormFieldModule, MatInputModule,
            MatGridListModule, MatSelectModule, MatDatepickerModule,
            MatButtonToggleModule, MatDialogModule, MatCardModule],

  exports: [CommonModule, MatButtonModule, MatNativeDateModule,
            MatIconModule, MatSidenavModule, MatListModule,
            MatToolbarModule, MatFormFieldModule, MatInputModule,
            MatGridListModule, MatSelectModule, MatDatepickerModule,
            MatButtonToggleModule, MatDialogModule, MatCardModule],
})
export class CustomMaterialModule { }
