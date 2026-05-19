import { Component, HostListener, OnInit } from '@angular/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { AppliedFilter } from '../ui-components/applied-filter/applied-filter';
import { RouterModule } from '@angular/router';
import { KnownBugService } from '../../services/known-bug-service';
import { CommonModule } from '@angular/common';
import { KnownBugModel } from '../../models/known-bug.model';
import { InputField } from '../ui-components/input-field/input-field';
import { HabitatsService } from '../../services/habitats.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encyclopedia',
  imports: [UnknownBugImage, AppliedFilter, RouterModule, CommonModule, InputField, FormsModule],
  templateUrl: './encyclopedia.html',
  styleUrl: './encyclopedia.scss',
})
export class Encyclopedia implements OnInit {

  constructor(private kBugService: KnownBugService, public habService: HabitatsService) { }

  width: number = window.innerWidth;
  size_of_comp: number = 10;

  kbugs?: KnownBugModel[];

  filter_colors: any;
  filter_bodytypes: any;
  filter_habitats: any;
  filter_size: any;
  filter_diet: any;
  filter_behaviour: any;

  current = 1;
  limit = 20;
  isLoading: boolean = false;
  hasMore: boolean = true;


  filters = {
    common_name: '',
    colors: [] as string[],
    bodyTypes: [] as string[],
    habitats: [] as string[],
    sizes: [] as string[],
    diets: [] as string[],
    behaviours: [] as string[],
    dangerous: null as boolean | null,
    wings: null as boolean | null,
    venomous: null as boolean | null,
    bites: null as boolean | null,
    stings: null as boolean | null,
    legs: null as number | null,
  };


  ngOnInit(): void {
    if (this.width < 600) {
      this.size_of_comp = 7;
    } else {
      this.size_of_comp = 15
    }

    this.loadKBugs(true)
  }

  loadKBugs(reset = false) {

    if (this.isLoading || (!reset && !this.hasMore)) return;

    if (reset) {
      this.current = 1;
      this.hasMore = true;
      this.kbugs = [];
    }

    const active = {
      ...this.getActiveFilters(),
      page: this.current,
      limit: this.limit
    };
    this.isLoading = true

    console.log(active)
    this.kBugService.getAll(active).subscribe({
      next: (response) => {
        console.log(response)
        const newBugs = response[0];
        this.kbugs = [...(this.kbugs ?? []), ...newBugs];

        this.hasMore = this.kbugs.length < response[7];
        this.current++;
        this.isLoading = false;

        if (this.current === 2) {
          this.filter_colors = response[1]
          this.filter_bodytypes = response[2]
          this.filter_habitats = response[3]
          this.filter_size = response[4]
          this.filter_diet = response[5]
          this.filter_behaviour = response[6]
        }
      },
      error: (response) => {
        console.log(response)
        this.isLoading = false;
      }
    })
  }

  // PROVERITI V

  toggleArrayFilter(filterKey: keyof typeof this.filters, value: string) {
    const arr = this.filters[filterKey] as string[];
    const idx = arr.indexOf(value);
    idx === -1 ? arr.push(value) : arr.splice(idx, 1);
  }

  toggleBoolFilter(filterKey: keyof typeof this.filters, value: boolean) {
    (this.filters as any)[filterKey] = (this.filters[filterKey] === value ? null : value) as any;
  }


  private getActiveFilters() {
  return Object.fromEntries(
    Object.entries(this.filters as any)
      .filter(([_, v]) =>
        v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)
      )
      .map(([k, v]) => {
        if (k === 'habitats') {
          const x:Array<string> = [];
          (v as Array<string>).forEach(hab => {
           x.push(this.habService.getCode(hab as string))
          });
          return [k, x];
        }
        return [k, v];
      })
  );
}

  applyFilters() {
    this.loadKBugs(true);
  }
  // PROVERITI /\

  @HostListener('window:resize')
  onResize() {
    this.width = window.innerWidth;
    if (this.width < 600) {
      this.size_of_comp = 7;
    } else {
      this.size_of_comp = 15
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    const threshold = 500; // px from bottom to trigger load
    const position = window.innerHeight + window.scrollY;
    const height = document.documentElement.scrollHeight;

    console.log(threshold, position, height)
    if (position >= height - threshold) {
      this.loadKBugs(false);
    }
  }
}
