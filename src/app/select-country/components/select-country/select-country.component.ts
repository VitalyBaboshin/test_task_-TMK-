import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, of, Subscription} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

import {DataService} from "src/app/shared/services/data.service";
import {log} from "util";

@Component({
  selector: 'vl-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent implements OnInit, OnDestroy{
  isLoading: boolean = false
  defaultValueSelect: string | null
  countries: string[] | null
  cities: string[] | null

  error: string | null

  subscriptions: Subscription[]=[];

  constructor(private data: DataService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    // Получаем список стран для селекта
    this.subscriptions.push(this.data.get().subscribe((data) => {
      this.countries = Object.keys(data.countries)


      const routerUrl = this.router.url.replace(/_/g, ' ').substr(1)
      if (!this.countries.includes(routerUrl)) {
        this.error = 'country not found'
        this.defaultValueSelect = ''
      } else {
        this.error = null
        this.defaultValueSelect = routerUrl
      }
    }))

    // Получаем список городов
    this.subscriptions.push(this.route.paramMap
      .pipe(switchMap((params: Params) => {
      setTimeout(() => {this.isLoading = true; })
      let country = params.get("country")
      if (country !== null) {
        country = country.replace(/_/g, ' ')
      }
      return this.data.getCities(country).pipe(tap((data) => {
          setTimeout(() => {this.isLoading = false})
      }

      ) )
    })).subscribe(data => {
      if (data === undefined) {
        data = []
      }
      this.cities = data
    } ))
  }

  navigateTo($event: any) {
    const link = ($event.target.value).replace(/ /g,"_");
    this.cities = null
    this.defaultValueSelect = $event.target.value
    this.router.navigate(['/', link]);
  }

  ngOnDestroy(): void {
    this.dispose();
  }

  dispose() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
