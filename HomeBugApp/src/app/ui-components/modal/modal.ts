import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {

  @Input() message: string = "This is a default testing message!"
  @Input() title: string = "Default Title"
  @Input() hasNegativeBtn: boolean = false;
  @Input() positiveBtnText: string = "YES";
  @Input() negativeBtnText: string = "NO";

  @Output() positiveClick = new EventEmitter<void>();
  @Output() negativeClick = new EventEmitter<void>();
  @Output() xClick = new EventEmitter<void>();

  onPositive() { this.positiveClick.emit(); }
  onNegative() { this.negativeClick.emit(); }
  onClose() { this.xClick.emit(); }


}
