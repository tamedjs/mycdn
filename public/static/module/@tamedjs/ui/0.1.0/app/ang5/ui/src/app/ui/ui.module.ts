import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from './ui-button/ui-button.component';

const components = [
  UiButtonComponent,
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [].concat (components),
  exports: [].concat (components),
})
export class UiModule { }
