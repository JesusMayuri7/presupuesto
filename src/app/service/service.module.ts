import { NgModule,ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CarService } from './car.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
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
