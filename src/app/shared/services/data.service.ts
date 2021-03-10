import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {DataInterface} from "src/app/shared/types/data.interface";
import {environment} from "src/environments/environment";

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  get(): Observable<DataInterface>{
      return this.http.get<DataInterface>(environment.urlMockData)
  }

  getCities(country): Observable<string []>{
    return this.http.get<DataInterface>(environment.urlMockData)
      .pipe(map(data => {
        return data.countries[country]
      }))
  }
}
