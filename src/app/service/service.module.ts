import { NgModule,ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { CarService } from './car.service';


@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ]
})
export class ServiceModule { 
  static forRoot():ModuleWithProviders {
       return {
            ngModule: ServiceModule,
            providers: [CarService]
        };
    }
}
