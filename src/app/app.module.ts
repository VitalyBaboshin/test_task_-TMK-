import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import {TopBarModule} from "src/app/shared/modules/topBar/top-bar.module";
import {SelectCountryModule} from "src/app/select-country/select-country.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TopBarModule,
    SelectCountryModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
