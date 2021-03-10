import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SelectCountryComponent} from "src/app/select-country/components/select-country/select-country.component";


const routes = [
  {
    path: '',
    component: SelectCountryComponent,
     pathMatch: 'full'
  },
  {
    path: ':country',
    component: SelectCountryComponent,
    pathMatch: 'full'
  }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
