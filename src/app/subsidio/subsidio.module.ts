import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceModule } from '../service/service.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {DataTableModule,SharedModule,DropdownModule,MultiSelectModule} from 'primeng/primeng';
import {TabViewModule,SliderModule,InputTextModule,GrowlModule} from 'primeng/primeng';
import {DialogModule,ButtonModule,PanelModule,CalendarModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';


import { SubsidioComponent } from './subsidio.component';

const routes:Routes = [
  {
    path: '',
    component: SubsidioComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    InputTextModule,
    GrowlModule,
    DropdownModule,
    MultiSelectModule,
    DialogModule, SliderModule,
    ServiceModule,
    SpinnerModule,
    ButtonModule,
    PanelModule,
    LazyLoadImageModule,
    CalendarModule,
 //   InterfaceModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SubsidioComponent]
})
export class SubsidioModule { }
