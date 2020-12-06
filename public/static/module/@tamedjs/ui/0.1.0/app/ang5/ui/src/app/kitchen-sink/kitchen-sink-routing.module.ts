import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmptyRouteComponent } from '../empty-route/empty-route.component';
import { UiButtonsComponent } from './ui-buttons/ui-buttons.component';

const routes: Routes = [
  { path: 'buttons', component: UiButtonsComponent },
  { path: '**', component: EmptyRouteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
})
export class KitchenSinkRoutingModule { }
