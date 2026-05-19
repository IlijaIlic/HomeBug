import { Component, HostListener, OnInit } from '@angular/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { RouterModule } from '@angular/router';
import { AppliedFilter } from '../ui-components/applied-filter/applied-filter';
import { UnknownBugModel } from '../../models/unknown-bug.model';
import { UnknownBugService } from '../../services/unknown-bug.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import countryData from '../../data/coords.json'

@Component({
  selector: 'app-search-page',
  imports: [UnknownBugImage, RouterModule, AppliedFilter, CommonModule, FormsModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage implements OnInit {

  bugs: UnknownBugModel[] = []
  width: number = window.innerWidth;
  size_of_comp: number = 10;

  current = 1;
  limit = 20;
  isLoading: boolean = false;
  hasMore: boolean = true;

  filters_colors: any;
  filters_sizes: any;
  filters_countries: any;

  public countryData = countryData as Record<string, { name: string; code3: string; coordinates: number[] }>;

  filters = {
    colors: [] as string[],
    sizes: [] as string[],
    countryCodes: [] as string[],
    wings: null as boolean | null,
    legs: null as number | null,
  };


  constructor(private ubugService: UnknownBugService) { }

  ngOnInit(): void {

    this.loadUbugs(true)
    if (this.width < 600) {
      this.size_of_comp = 10;
    } else {
      this.size_of_comp = 15
    }
  }

  loadUbugs(reset = false) {
    if (this.isLoading || (!reset && !this.hasMore)) return;

    if (reset) {
      this.current = 1;
      this.hasMore = true;
      this.bugs = [];
    }

    const active = {
      ...this.getActiveFilters(),
      page: this.current,
      limit: this.limit
    };


    this.isLoading = true
    this.ubugService.getAll(active).subscribe({
      next: (response) => {
        const newBugs = response[0];
        this.bugs = [...(this.bugs ?? []), ...newBugs];

        this.hasMore = this.bugs.length < response[4];
        this.current++;
        this.isLoading = false;

        if (this.current === 2) {
          this.filters_colors = response[1];
          this.filters_sizes = response[2];
          this.filters_countries = response[3];
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    if (this.width < 600) {
      this.size_of_comp = 10;
    } else {
      this.size_of_comp = 15
    }
  }

  private getActiveFilters() {
    return Object.fromEntries(
      Object.entries(this.filters as any).filter(([_, v]) =>
        v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)
      )
    );
  }

  applyFilters() {
    this.loadUbugs(true);
  }

  toggleArrayFilter(filterKey: keyof typeof this.filters, value: string) {
    const arr = this.filters[filterKey] as string[];
    const idx = arr.indexOf(value);
    idx === -1 ? arr.push(value) : arr.splice(idx, 1);
  }

  toggleBoolFilter(filterKey: keyof typeof this.filters, value: boolean) {
    (this.filters as any)[filterKey] = (this.filters[filterKey] === value ? null : value) as any;
  }



  @HostListener('window:scroll')
  onScroll() {
    const threshold = 500; 
    const position = window.innerHeight + window.scrollY;
    const height = document.documentElement.scrollHeight;

    console.log(threshold, position, height)
    if (position >= height - threshold) {
      this.loadUbugs(false);
    }
  }


}
