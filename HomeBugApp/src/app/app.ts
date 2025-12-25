import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Landing } from './landing/landing';
import { Header } from './ui-components/header/header';
import { Footer } from './ui-components/footer/footer';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'HomeBugApp';
  protected activeRoute = inject(ActivatedRoute);
  protected showHeader: Boolean = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {

        if (this, router.url === '/register' || router.url === "/login") {
          this.showHeader = false
        } else {
          this.showHeader = true
        }
        console.log('Current route URL:', this.router.url);
      });
  }
}
