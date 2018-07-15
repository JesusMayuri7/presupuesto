import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ServiceModule } from '../service/service.module';
import { CasComponent } from './cas.component';
import {DataTableModule,DropdownModule,MultiSelectModule} from 'primeng/primeng';
import {TabViewModule,SliderModule,InputTextModule,GrowlModule} from 'primeng/primeng';


const routes:Routes = [
  {
    path: '',
    component: CasComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    ServiceModule,
    DataTableModule,
    DropdownModule,
    MultiSelectModule,
    LazyLoadImageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CasComponent]
})
export class CasModule { }
