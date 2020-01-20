import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatFormFieldModule} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatFormFieldModule],
  exports: [CommonModule, MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule, MatFormFieldModule],
})
export class CustomMaterialModule { }
