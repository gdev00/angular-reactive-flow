import { NgModule } from "@angular/core";

import { ProductsGridComponent } from "./products-grid.component";
import { ProductsService } from './products-test.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule
  ],
  declarations: [
    ProductsGridComponent
  ],
  exports: [
    ProductsGridComponent
  ],
  providers: [
    ProductsService
  ]
})

export class ProductsModule { }
