import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit, OnDestroy{

  constructor (public authService : AuthService) {}
  private subscription = new Subscription();
  loggedIn = false;
  @Input() wave_show = false;
  menuOpen = false;



  ngOnInit(): void {
    this.loggedIn = !!this.authService.isLoggedIn();
    this.subscription.add(
      this.authService.currentUser$.subscribe( user => {
        this.loggedIn = !!user;
        console.log('Header - loggedIn promenjen na:', this.loggedIn);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : ''
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = ''

  }

  handleLogout(){
    console.log(this.authService.getToken())
    this.authService.logout()
  }

  @HostListener('document:keydown.escape')
  handleEsc() {
    this.closeMenu();
  }
}
