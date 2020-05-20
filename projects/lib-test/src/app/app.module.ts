import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ComponentLoaderService } from './component-loader.service';
import { AppComponent } from './app.component';
import { CsTableModule } from 'cs-table'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CsTableModule.forRoot({
      components: ComponentLoaderService.getComponent,
      apiBase: 'http://localhost:8081'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
