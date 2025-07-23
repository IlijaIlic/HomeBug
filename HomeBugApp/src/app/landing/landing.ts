import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { concat, concatMap, delay, finalize, interval, of, take } from 'rxjs';
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations'

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
  animations:[
    trigger('popupAnimation',[
      state('inactive', style({transform: 'scale(0)', visibility:'hidden'})),
      state('active', style({transform: 'scale(1)', visibility: 'visible'})),
      transition('inactive => active', animate('0.4s {{delay}} ease-in', keyframes([
        style({transform: 'scale(0)',visibility: 'visible', offset: 0}),
        style({transform: 'scale(1.2)', offset: 0.7}),
        style({transform: 'scale(1)', offset: 1}),
      ])),{params: {delay: '1s'}}
    ),
      transition('active => inactive', animate('0.5s ease-out'))
    ])
  ]
})
export class Landing {
  words: string[] = [];
  currWord: string = "";
  max: number = 1;
  min: number = 19;

  isHoveredMagn = false
  constructor(private http: HttpClient) { }


  ngOnInit() {
    this.http.get('assets/landing-cycle-text.txt', { responseType: "text" }).subscribe(data => {
      this.words = data.split('\n').filter(line => line.trim() !== '');
      this.currWord = this.words[0]
      this.cycleWords();
    });
   
  }

  cycleWords() {
    interval(5000)
      .pipe(
        take(this.words.length),
        finalize(() => this.cycleWords())
      )
      .subscribe(() => {
        const randValue = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        this.currWord = this.words[randValue];
      })
  }

  onHoverMagn(state:boolean){
    this.isHoveredMagn = state;
  }

}
