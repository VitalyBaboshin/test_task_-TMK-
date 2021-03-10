import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {of, Subscription, combineLatest} from "rxjs";
import {switchMap} from "rxjs/operators";

import {DataService} from "src/app/shared/services/data.service";

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

    this.subscriptions.push(this.route.paramMap
      .pipe(
      switchMap((params: Params) => {
        let country: string | null = params.get("country")
        if (country !== null) {
          country = country.replace(/_/g, ' ')
        }
        return of(country)
      }),
      switchMap((data) => {
       return combineLatest([this.data.get(), this.data.getCities(data)])
      })
    )
        .subscribe((data) => {
          //Получаем список стран
          this.countries = Object.keys(data[0].countries)

          const routerUrl = this.router.url.replace(/_/g, ' ').substr(1)
          //Устанавливаем для Selector выбранное значениепо умолчанию
          // Если в списке стран не найдена страна то дефол значение сбрасываем
          if (!this.countries.includes(routerUrl) && routerUrl !=='') {
            this.error = 'country not found'
            this.defaultValueSelect = ''
          } else {
            this.error = null
            this.defaultValueSelect = routerUrl
          }

          // Получаем список городов
          if (data[1] === undefined) {
            this.cities = []
          } else {
            this.cities = data[1]
          }
        })
    )
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
