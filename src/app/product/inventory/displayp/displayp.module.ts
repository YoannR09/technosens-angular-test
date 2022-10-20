import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../product.service';
import { DisplaypComponent } from './displayp.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [DisplaypComponent],
  exports: [DisplaypComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
  ]
})
export class DisplaypModule { }
