import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule} from '@angular/router/';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TabMenuModule,DropdownModule,ButtonModule,GrowlModule} from 'primeng/primeng';
import {DataGridModule,PanelModule,DialogModule} from 'primeng/primeng';

import { ShellComponent } from './shell/shell.component';
import { HomeComponent } from '../home/home.component';
import { TopBarComponent } from './shell/top-bar/top-bar.component';
import { MainContentComponent } from './shell/main-content/main-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'about',
    loadChildren: './../about/about.module#AboutModule'
  },
    {
    path: 'subsidio',
    loadChildren: './../subsidio/subsidio.module#SubsidioModule'
  },
    {
    path: 'casanalisis',
    loadChildren: './../cas/cas.module#CasModule'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,GrowlModule,
    DropdownModule,TabMenuModule,ButtonModule,
    DataGridModule,PanelModule,DialogModule
  ],
  declarations: [ShellComponent, TopBarComponent, MainContentComponent,HomeComponent],
  exports: [ShellComponent]
})
export class CoreModule { }
