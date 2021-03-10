import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { SelectCountryComponent } from 'src/app/select-country/components/select-country/select-country.component';
import {DataService} from "src/app/shared/services/data.service";
import {CardCityModules} from "src/app/shared/modules/card-city/card-city.modules";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CardCityModules
  ],
  declarations: [SelectCountryComponent],
  exports: [SelectCountryComponent],
  providers: [DataService]
})

export class SelectCountryModule {}
