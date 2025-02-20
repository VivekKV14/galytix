import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data-service.service';
import { UNITS, UNITS_VALUE } from '../app.constants';

@Component({
  selector: 'app-wheather',
  templateUrl: './wheather.component.html',
  styleUrls: ['./wheather.component.scss']
})
export class WheatherComponent implements OnInit {
  public countryData: any = null;
  public loading: boolean = true;
  public weatherData: any = null;
  public readonly units = UNITS;
  public readonly unitValue = UNITS_VALUE
  public selectedUnit = this.units.METRIC

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.country) {
        this.countryData = JSON.parse(params.country);
        console.log(this.countryData);
        this.getWeatherData();
      } else {
        this.loading = false;
      }
    });
  }

  getWeatherData(): void {
    this.loading = true;
    const cityInfo = (this.countryData.capitalInfo || {}).latlng || [];
    if (!cityInfo.length) {
      this.loading = false;
      return;
    }
    this.data.getWeatherData(cityInfo, this.selectedUnit).subscribe(res => {
      this.weatherData = res;
      console.log(res);
      this.weatherData.iconUrl = `https://openweathermap.org/img/wn/${res.weather[0].icon}.png`
      this.loading = false;
    })
  }

}
