import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KitchenSinkRoutingModule } from './kitchen-sink-routing.module';

import { UiModule } from '../ui/ui.module';
// import { UiModule } from '@tamedjs/trg-ui-ang5';

import { UiButtonsComponent } from './ui-buttons/ui-buttons.component';
import { EmptyRouteComponent } from '../empty-route/empty-route.component';

const components = [
  EmptyRouteComponent,
  UiButtonsComponent,
]

@NgModule({
  imports: [
    KitchenSinkRoutingModule,
    CommonModule,
    UiModule,
  ],
  declarations: [].concat (components),
  exports: [
    UiModule
  ].concat (components),
})
export class KitchenSinkModule { }
