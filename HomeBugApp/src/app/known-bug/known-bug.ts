import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet'
import { Feature, Polygon } from 'geojson';

@Component({
  selector: 'app-known-bug',
  imports: [],
  templateUrl: './known-bug.html',
  styleUrl: './known-bug.scss',
})
export class KnownBug implements AfterViewInit {

  map!: L.Map;

  ngAfterViewInit(): void {

    this.map = L.map('location-map').setView([35, 50],1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.addRegions();
  }

  addRegions() {

    const southEurope: Feature<Polygon> = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-10, 35],
          [30, 35],
          [30, 45],
          [-10, 45],
          [-10, 35]
        ]]
      },
      properties: {}
    };



    L.geoJSON(southEurope, {
      style: {
        color: "green",
        fillOpacity: 0.3
      }
    }).addTo(this.map);



  }
}
