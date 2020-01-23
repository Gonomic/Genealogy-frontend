import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatGridListModule} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatGridListModule],
  exports: [CommonModule, MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatGridListModule],
})
export class CustomMaterialModule { }
