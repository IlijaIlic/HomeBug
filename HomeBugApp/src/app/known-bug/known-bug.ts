import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet'
import { Feature, Polygon } from 'geojson';
import { REGIONS } from '../../data/regions';

type HabitatKey = "grass" | "forest" | "garden" | "wet" | "desert" | "mountain" | "rainforest" | "agro";

@Component({
  selector: 'app-known-bug',
  imports: [],
  templateUrl: './known-bug.html',
  styleUrl: './known-bug.scss',
})
export class KnownBug implements AfterViewInit {

  map!: L.Map;

  ngAfterViewInit(): void {

    this.map = L.map('location-map').setView([35, 50], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    this.addRegions();
  }

  addRegions() {
    const southEurope = REGIONS["eastAsia"];

   


    L.geoJSON(southEurope, {
      style: {
        color: "green",
        fillOpacity: 0.3
      }
    }).addTo(this.map);
  }

  habitats: Record<HabitatKey, string> = {
    "grass": "🌾 Grasslands",
    "forest": "🌳 Forests",
    "garden": "🌺 Gardens",
    "wet": "🌊 Wetlands",
    "desert": "🏜️ Deserts",
    "mountain": "⛰️ Mountains",
    "rainforest": "🌴 Tropical Rainforests",
    "agro": "🌾 Agricultural Fields"
  }
}
