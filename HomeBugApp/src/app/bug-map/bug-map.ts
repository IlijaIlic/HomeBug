import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet'
import countries from "../../data/coords.json"
import { Router, RouterModule } from '@angular/router';
import { UnknownBugService } from '../../services/unknown-bug.service';
import { delay, Observable, pipe, repeat, Subject, switchMap, takeUntil, timer } from 'rxjs';


@Component({
  selector: 'app-bug-map',
  imports: [RouterModule],
  templateUrl: './bug-map.html',
  styleUrl: './bug-map.scss',
})
export class BugMap implements AfterViewInit, OnInit, OnDestroy {


  map!: L.Map;
  private lastFetch;
  private customIcon = L.divIcon({
    className: 'custom-marker',
    html: `<div class="marker-pin"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });


  constructor(private ubugService: UnknownBugService, private router: Router) {
    this.lastFetch = new Date()
  }

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
  }

  private destroy$ = new Subject<void>();

  ngOnInit(): void {



    timer(0, 10000).pipe(
      switchMap(() => {
        const prevTime = this.lastFetch
        this.lastFetch = new Date()
        return this.ubugService.findFromTime(prevTime.toISOString())
      }
      ),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (!response.length) return;
        const stride = 5 / response.length;
        response.forEach((bug, index) => {
          const delay = index * stride * 1000;

          setTimeout(() => {
            const marker = L.marker(
              countries[bug.countryCode as keyof typeof countries].coordinates as [number, number],
              { icon: this.customIcon, title: countries[bug.countryCode as keyof typeof countries].name }
            ).addTo(this.map).on('click', () => this.router.navigate(["/search/unknown/" + bug.id]));

            setTimeout(() => {
              const pin = marker.getElement()?.querySelector('.marker-pin') as HTMLElement;
              if (pin) pin.classList.add('marker-fade');
            }, 4500);

            setTimeout(() => {
              marker.remove();
            }, 5000);

          }, delay);
        });
      },
      error: (response) => console.log(response)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
