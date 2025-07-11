import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { finalize, interval, take } from 'rxjs';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.scss'
})
export class Landing {
  words: string[] = [];
  currWord: string = "";
  max: number = 1;
  min: number = 19;

  constructor(private http: HttpClient) {}


  ngOnInit(){
    this.http.get('assets/landing-cycle-text.txt', {responseType: "text"}).subscribe(data=>{
      this.words = data.split('\n').filter(line => line.trim() !== '');
      this.currWord = this.words[0]
      this.cycleWords();
    });
  }


  cycleWords(){
    interval(5000)
      .pipe(
        take(this.words.length),
        finalize(()=>this.cycleWords()))
      .subscribe(()=>{
        const randValue = Math.floor(Math.random() * (this.max-this.min+1)) + this.min;
        this.currWord = this.words[randValue];
      });
  }
}
