import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { EmptyRouteComponent } from './empty-route/empty-route.component';

import { KitchenSinkModule } from './kitchen-sink/kitchen-sink.module';

@NgModule({
  declarations: [
    AppComponent,
    // EmptyRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KitchenSinkModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
