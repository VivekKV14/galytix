import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public API_KEY = '794ee95e63c5a32aaf88cd813fa2e425';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCountryList(): Observable<any> {
    return this.httpClient.get('https://restcountries.com/v3.1/all');
  }

  getWeatherData(info: any[], unit: string): Observable<any> {
    return this.httpClient.get(`https://api.openweathermap.org/data/2.5/weather?lat=${info[0]}&lon=${info[1]}&appid=${this.API_KEY}&units=${unit}`)
  }

}
