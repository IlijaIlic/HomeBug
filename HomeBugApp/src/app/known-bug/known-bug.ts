import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet'
import { REGIONS } from '../../data/regions';
import { KnownBugModel } from '../../models/known-bug.model';
import { KnownBugService } from '../../services/known-bug-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../auth/auth.service';
import { HabitatsService } from '../../services/habitats.service';
import * as GeoJSON from 'geojson';
import { forkJoin, switchMap } from 'rxjs';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';

type HabitatKey = "grass" | "forest" | "garden" | "wet" | "desert" | "mountain" | "rainforest" | "agro";

@Component({
  selector: 'app-known-bug',
  imports: [NgIcon, UnknownBugImage, RouterModule],
  templateUrl: './known-bug.html',
  styleUrl: './known-bug.scss',
})
export class KnownBug implements AfterViewInit, OnInit {

  constructor(
    private kbugService: KnownBugService,
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public habitatService: HabitatsService,
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

  filters = {
    color: "" as string,
    bodyType: "" as string,
    size: "" as string,
    regions: [] as string[],
  };


  public similarBugs: KnownBugModel[] = []

  ngOnInit(): void {
    const userId = this.authService.currentUserSubject.value.sub

    this.route.paramMap.pipe(
      switchMap(params => {
        const bugId = Number(params.get('id'));
        return this.kbugService.getById(bugId);
      }),
      switchMap(result => {
        this.bug = result
        console.log(result)
        this.addRegions()
        this.filters.bodyType = result.body_type
        this.filters.color = result.color
        this.filters.size = result.size

        return forkJoin({
          similar: this.kbugService.getSimilar(this.filters, result.id),
          user: this.userService.getById(userId)
        })
      })
    ).subscribe({
      next: ({ similar, user }) => {
        this.similarBugs = similar
        console.log(similar)
        this.saved = user.saved_bugs?.some(x => x.id == this.bug.id) ?? false
      },
      error: (response) => console.log(response)
    })

  }

  ngAfterViewInit(): void {
    this.map = L.map('location-map').setView([35, 50], 1);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

  }

  addRegions() {

    this.map.eachLayer(layer => {
    if (!(layer instanceof L.TileLayer)) {
      this.map.removeLayer(layer);
    }
  });

    const colors = [
      '#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6',
      '#1abc9c', '#e67e22', '#e91e63', '#00bcd4', '#8bc34a'
    ];
    this.bug.regions.forEach((region, index) => {
      const color = colors[index % colors.length];
      L.geoJSON({
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [region.coord] },
        properties: {}
      } as GeoJSON.Feature, {
        style: {
          color: color,
          fillColor: color,
          fillOpacity: 0.3,
          weight: 2
        }
      }).addTo(this.map);
    });
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


  goToEncyclopedia(filterKey: string, value: any) {
    this.router.navigate(['/encyclopedia'], {
      queryParams: { [filterKey]: value }
    });
  }



}
