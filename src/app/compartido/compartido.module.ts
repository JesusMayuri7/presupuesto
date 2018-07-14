import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { CarService } from './car.service';
import {SelectItem,MenuItem,LazyLoadEvent,FilterMetadata} from './api';


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  
  providers: [CarService]
})
export class CompartidoModule { }
