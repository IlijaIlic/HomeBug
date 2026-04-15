import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
import { REGIONS } from '../../data/regions';
import { KnownBugModel } from '../../models/known-bug.model';
import { KnownBugService } from '../../services/known-bug-service';
import { ActivatedRoute } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../auth/auth.service';

type HabitatKey = "grass" | "forest" | "garden" | "wet" | "desert" | "mountain" | "rainforest" | "agro";

@Component({
  selector: 'app-known-bug',
  imports: [NgIcon],
  templateUrl: './known-bug.html',
  styleUrl: './known-bug.scss',
})
export class KnownBug implements AfterViewInit, OnInit {

  constructor(
    private kbugService: KnownBugService,
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  map!: L.Map;
  apiUrl = "http://localhost:3000/"
  index = 0
  saved = false

  public bug: KnownBugModel = {
    id: -1,
    common_name: "",
    latin_name: "",
    picture_urls: ["Test"],
    taxonomy: {
      id: -1,
      taxonomyClass: "",
      order: "",
      family: "",
      genus: "",
      species: "",
    },
    overview: "",
    regions: [],
    habitats: [],
    behaviour: "",
    body_type: "",
    color: "",
    diet: "",
    no_legs: 0,
    size: "",
    danger_to_humans: false,
    stings: false,
    venomous: false,
    wings: false,
    bites: false,
  };

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.kbugService.getById(id).subscribe({
      next: (response) => {
        this.bug = response
        console.log(response)
      },
      error: (response) => console.log(response)
    })

    this.userService.getById(this.authService.currentUserSubject.value.sub).subscribe({
      next: (res) => {
        if (res.saved_bugs?.some(x => x.id == this.bug.id)) {
          this.saved = true
        } else {
          this.saved = false
        }
      },
      error: (res) => console.log(res)
    })


  }

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

  nextImage() {
    if (this.bug.picture_urls) {
      this.index = (this.index + 1) % this.bug.picture_urls.length
    }
  }

  prevImage() {
    if (this.bug.picture_urls) {
      this.index = (this.index - 1 + this.bug.picture_urls.length) % this.bug.picture_urls.length
    }
  }

  handleSave() {
    this.userService.addSaved(this.bug.id).subscribe({
      next: (res) => {
        console.log(res)
        if (res.saved_bugs?.some(x => x.id == this.bug.id)) {
          this.saved = true
        } else {
          this.saved = false

        }
      },
      error: (res) => console.log(res)
    })
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
