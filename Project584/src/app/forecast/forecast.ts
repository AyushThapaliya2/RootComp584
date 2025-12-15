import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ForecastData } from '../forecast-data';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast',
  imports: [CommonModule],
  templateUrl: './forecast.html',
  styleUrl: './forecast.scss'
})
export class Forecast {
  forecasts: ForecastData[] = [];

  constructor(http: HttpClient) {
    http.get<ForecastData[]>(environment.apiUrl + 'api/SeismicForecast').subscribe(result => {
      this.forecasts = result;
    });
  }
}
