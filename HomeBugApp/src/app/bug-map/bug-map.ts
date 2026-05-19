import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet'
import countries from "../../data/coords.json"
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-bug-map',
  imports: [RouterModule],
  templateUrl: './bug-map.html',
  styleUrl: './bug-map.scss',
})
export class BugMap implements AfterViewInit {

  map!: L.Map;


  ngAfterViewInit(): void {

    this.map = L.map('location-map', {
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false,
      zoomControl: false
    }).setView([35, 10], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    const country = countries['rs'];
    
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-pin"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

   L.marker(country.coordinates as [number, number], {icon: customIcon})
      .bindTooltip(`${country.name} (${country.code3})`)
      .addTo(this.map);
   

  }

}
