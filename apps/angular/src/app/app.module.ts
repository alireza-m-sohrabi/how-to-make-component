import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NxWelcomeComponent} from './nx-welcome.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {
  AngularRangeSelectorExampleComponent
} from "./angular-range-selector-example/angular-range-selector-example.component";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent,],
  imports: [
    BrowserModule,
    AngularRangeSelectorExampleComponent,
    RouterModule.forRoot(appRoutes, {initialNavigation: 'enabledBlocking'}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
