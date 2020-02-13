import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatNativeDateModule, MatIconModule,
         MatSidenavModule, MatListModule, MatToolbarModule, 
         MatFormFieldModule, MatInputModule, MatGridListModule,
         MatSelectModule, MatDatepickerModule, MatButtonToggleModule} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatNativeDateModule,
            MatIconModule, MatSidenavModule, MatListModule,
            MatToolbarModule, MatFormFieldModule, MatInputModule,
            MatGridListModule, MatSelectModule, MatDatepickerModule,
            MatButtonToggleModule],

  exports: [CommonModule, MatButtonModule, MatNativeDateModule,
            MatIconModule, MatSidenavModule, MatListModule,
            MatToolbarModule, MatFormFieldModule, MatInputModule,
            MatGridListModule, MatSelectModule, MatDatepickerModule,
            MatButtonToggleModule],
})
export class CustomMaterialModule { }
