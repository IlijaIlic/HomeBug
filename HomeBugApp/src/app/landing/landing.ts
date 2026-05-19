import { Component } from '@angular/core';
import { Modal } from '../ui-components/modal/modal';

@Component({
  selector: 'app-landing',
  imports: [Modal],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',

})
export class Landing {

  isHoveredMagn = false
  isModalOpen = false

  onHoverMagn(state: boolean) {
    this.isHoveredMagn = state;
    this.openModal()
  }

  openModal() {
    this.isModalOpen = true
  }

  closeModal() {
    this.isModalOpen = false
  }

  positiveModal() {
    console.log("POS")
    this.closeModal();
  }

  negativeModal() {
    console.log("NEG")
    this.closeModal();
  }

  xModal() {
    this.closeModal();
  }

}
