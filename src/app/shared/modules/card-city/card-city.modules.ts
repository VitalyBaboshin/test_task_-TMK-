import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {CardCityComponent} from "src/app/shared/modules/card-city/components/card-city/card-city.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CardCityComponent],
  exports: [CardCityComponent]
})

export class CardCityModules {}
