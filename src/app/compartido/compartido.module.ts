import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CarService } from './car.service';
import {SelectItem,MenuItem,LazyLoadEvent,FilterMetadata} from './api';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  
  providers: [CarService]
})
export class CompartidoModule { }
