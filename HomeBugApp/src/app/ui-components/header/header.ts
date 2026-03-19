import { Component, HostListener, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ui-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  @Input() wave_show = false;

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : ''
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = ''

  }

  @HostListener('document:keydown.escape')
  handleEsc() {
    this.closeMenu();
  }
}
