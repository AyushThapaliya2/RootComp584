import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { EarthquakeEvent } from '../models/earthquake-event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-earthquakes',
  imports: [CommonModule],
  templateUrl: './earthquakes.html',
  styleUrl: './earthquakes.scss',
})
export class Earthquakes {
  quakes: EarthquakeEvent[] = [];

  constructor(http: HttpClient) {
    http.get<EarthquakeEvent[]>(environment.apiUrl + 'api/earthquakes').subscribe((result) => {
      this.quakes = result;
    });
  }
}
