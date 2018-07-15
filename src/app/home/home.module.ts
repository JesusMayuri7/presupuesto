import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModule } from '../service/service.module';
import { HomeComponent } from './home.component';
import {RouterModule,Routes} from '@angular/router';

const routes:Routes = [
  {
    path: '',
    component:HomeComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    ServiceModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
