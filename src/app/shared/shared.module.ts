import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipe/filter.pipe';

@NgModule({
  declarations: [
    FilterPipe
  ],
  exports: [
    FilterPipe
  ]
})
export class SharedModule { }
