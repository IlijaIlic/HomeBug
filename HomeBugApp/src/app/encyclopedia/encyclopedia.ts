import { Component, HostListener, OnInit } from '@angular/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { AppliedFilter } from '../ui-components/applied-filter/applied-filter';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { KnownBugService } from '../../services/known-bug-service';
import { CommonModule } from '@angular/common';
import { KnownBugModel } from '../../models/known-bug.model';
import { InputField } from '../ui-components/input-field/input-field';
import { HabitatsService } from '../../services/habitats.service';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Subject, switchAll, switchMap, take, throttleTime } from 'rxjs';

@Component({
  selector: 'app-encyclopedia',
  imports: [UnknownBugImage, AppliedFilter, RouterModule, CommonModule, InputField, FormsModule],
  templateUrl: './encyclopedia.html',
  styleUrl: './encyclopedia.scss',
})
export class Encyclopedia implements OnInit {


  constructor(private kBugService: KnownBugService, public habService: HabitatsService, private route: ActivatedRoute) { }

  width: number = window.innerWidth;
  size_of_comp: number = 10;

  kbugs?: KnownBugModel[];

  filter_colors: any;
  filter_bodytypes: any;
  filter_habitats: any;
  filter_size: any;
  filter_diet: any;
  filter_behaviour: any;
  filter_regions: any;

  current = 1;
  limit = 20;
  isLoading: boolean = false;
  hasMore: boolean = true;

  filterChange = new Subject<void>();
  searchInput = new Subject<string>();

  nameSuggestions: string[] = []

  filters = {
    common_name: '',
    colors: [] as string[],
    bodyTypes: [] as string[],
    habitats: [] as string[],
    sizes: [] as string[],
    diets: [] as string[],
    regions: [] as string[],
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

    this.filterChange.pipe(debounceTime(2000)).subscribe(() => this.loadKBugs(true))


    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if (params['colors']) this.filters.colors = [params['colors']];
      if (params['bodyTypes']) this.filters.bodyTypes = [params['bodyTypes']];
      if (params['sizes']) this.filters.sizes = [params['sizes']];
      if (params['habitats']) this.filters.habitats = [this.habService.getLabel(params['habitats'])];
      if (params['diets']) this.filters.diets = [params['diets']];
      if (params['behaviours']) this.filters.behaviours = [params['behaviours']];
      if (params['legs']) this.filters.legs = Number(params['legs']);

      // Boolean filters
      if (params['wings'] !== undefined) this.filters.wings = params['wings'] === 'true';
      if (params['dangerous'] !== undefined) this.filters.dangerous = params['dangerous'] === 'true';
      if (params['venomous'] !== undefined) this.filters.venomous = params['venomous'] === 'true';
      if (params['bites'] !== undefined) this.filters.bites = params['bites'] === 'true';
      if (params['stings'] !== undefined) this.filters.stings = params['stings'] === 'true';
      this.loadKBugs(true);
    });

    this.searchInput.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(value => {
        if (value.trim().length <= 3) {
          this.nameSuggestions = [];
          return false;
        }
        return value.trim().length > 3;
      }),
      switchMap(value => {
        this.filters.common_name = value;
        return this.kBugService.getNames(value)
      })
    ).subscribe({
      next: (response) => {
        console.log(response)
        this.nameSuggestions = response
      }
    })

    //   @HostListener('window:scroll')
    // onScroll() {
    //   const threshold = 500;
    //   const position = window.innerHeight + window.scrollY;
    //   const height = document.documentElement.scrollHeight;

    //   console.log(threshold, position, height)
    //   if (position >= height - threshold) {
    //     this.loadKBugs(false);
    //   }
    // }

    const treshold = 500
    fromEvent(window, 'scroll').pipe(
      throttleTime(200),
      map(() => ({
        position: window.innerHeight + window.scrollY,
        height: document.documentElement.scrollHeight
      })),
      filter(({ position, height }) => position >= height - treshold),
      filter(() => !this.isLoading && this.hasMore)
    ).subscribe(() => {
      this.loadKBugs(false)
    }
    )
  }

  ngOnDestroy(): void {
    this.filterChange.complete();
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
    this.kBugService.getFiltered(active).subscribe({
      next: (response) => {
        console.log(response)
        const newBugs = response[0];
        this.kbugs = [...(this.kbugs ?? []), ...newBugs];

        this.hasMore = this.kbugs.length < response[8];
        this.current++;
        this.isLoading = false;

        if (this.current === 2) {
          this.filter_colors = response[1]
          this.filter_bodytypes = response[2]
          this.filter_habitats = response[3]
          this.filter_size = response[4]
          this.filter_diet = response[5]
          this.filter_behaviour = response[6]
          this.filter_regions = response[7]
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

    this.filterChange.next()
  }

  toggleBoolFilter(filterKey: keyof typeof this.filters, value: boolean) {
    (this.filters as any)[filterKey] = (this.filters[filterKey] === value ? null : value) as any;

    this.filterChange.next()
  }


  private getActiveFilters() {
    return Object.fromEntries(
      Object.entries(this.filters as any)
        .filter(([_, v]) =>
          v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)
        )
        .map(([k, v]) => {
          if (k === 'habitats') {
            const x: Array<string> = [];
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



  removeLegs() {
    this.filters.legs = null
    this.filterChange.next()
  }

  valueChanged(event: string) {
    this.filterChange.next()
    this.searchInput.next(event)
  }
}
