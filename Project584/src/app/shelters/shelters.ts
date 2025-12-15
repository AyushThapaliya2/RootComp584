import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { ShelterLocation } from '../models/shelter-location';
import { ShelterDistance } from '../models/shelter-distance';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shelters',
  imports: [CommonModule],
  templateUrl: './shelters.html',
  styleUrl: './shelters.scss',
})
export class Shelters {
  shelters: ShelterLocation[] = [];
  nearby: ShelterDistance[] = [];
  lat = 34.05;
  lng = -118.25;

  constructor(private http: HttpClient) {
    this.loadShelters();
    this.loadNearby();
  }

  loadShelters() {
    this.http.get<ShelterLocation[]>(environment.apiUrl + 'api/shelters').subscribe((result) => {
      this.shelters = result;
    });
  }

  loadNearby() {
    this.http
      .get<ShelterDistance[]>(
        `${environment.apiUrl}api/shelters/nearby?lat=${this.lat}&lng=${this.lng}&take=5`
      )
      .subscribe((result) => {
        this.nearby = result;
      });
  }

  updateCoordinates(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
    this.loadNearby();
  }
}
