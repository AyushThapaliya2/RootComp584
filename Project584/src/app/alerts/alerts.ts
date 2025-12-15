import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { EarthquakeEvent } from '../models/earthquake-event';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerts',
  imports: [CommonModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.scss',
})
export class Alerts implements OnInit {
  alerts: EarthquakeEvent[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<EarthquakeEvent[]>(`${environment.apiUrl}api/earthquakes/alerts`)
      .subscribe((result) => {
        this.alerts = result;
      });
  }
}
