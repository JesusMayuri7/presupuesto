import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceModule } from './service/service.module';
import { CoreModule } from './core/core.module';
import { ShellComponent } from './core/shell/shell.component';


@NgModule({
  declarations: [  ],
  imports: [
    BrowserModule,
    CoreModule,ServiceModule.forRoot()
  ],
  providers: [],
  bootstrap: [ShellComponent]
})
export class AppModule { }
