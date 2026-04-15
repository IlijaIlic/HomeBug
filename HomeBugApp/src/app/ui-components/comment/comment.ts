import { Component, Input, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { CommentModel } from '../../../models/comment.model';
import { AuthService } from '../../auth/auth.service';
import { CommentService } from '../../../services/comment.service';
import { delay, switchMap } from 'rxjs';

type ReputationKey = -2 | -1 | 0 | 1 | 2;

@Component({
  selector: 'app-comment',
  imports: [NgIcon],
  templateUrl: './comment.html',
  styleUrl: './comment.scss',
})
export class Comment implements OnInit {

  @Input()
  comment!: CommentModel;
  
  disabled = false;
  liked = false;
  disliked = false
  reputations: Record<ReputationKey, string> = {
    "-2": "Bug Bait 🐞",
    "-1": "Web of Confusion 🕷️",
    "0": "Bug Spotter 🐜",
    "1": "Insect Insider 🐝",
    "2": "Bug Whisperer 🦋",
  }
  userReputation: ReputationKey = -1;

  constructor(private authService: AuthService, private comService: CommentService) { }

  ngOnInit(): void {

    if (this.authService.currentUserSubject.value.sub == this.comment.user.id) {
      this.disabled = true
      console.log("TEST")
    }else{
      console.log("TEST@ASDFASDF")
    }

    switch (true) {
      case (this.comment!.user.reputation < -200):
        this.userReputation = -2;
        break;
      case (this.comment!.user.reputation >= -200 && this.comment!.user.reputation < -100):
        this.userReputation = -1;
        break;
      case (this.comment!.user.reputation > -50 && this.comment!.user.reputation <= 50):
        this.userReputation = 0;
        break;
      case (this.comment!.user.reputation > 50 && this.comment!.user.reputation <= 200):
        this.userReputation = 1;
        break;
      case (this.comment!.user.reputation > 200):
        this.userReputation = 2;
        break;

    }


    this.changeRateUI()

  }

  changeRateUI() {
    if (this.comment?.ratings) {

      const alrRated = this.comment.ratings.find(r =>
        r.userId == this.authService.currentUserSubject.value.sub
      )

      if (alrRated) {
        if (alrRated.rate == '+') {
          this.liked = true
          this.disliked = false
        } else if (alrRated.rate == '-') {
          this.disliked = true
          this.liked = false
        } else {
          this.liked = false
          this.disliked = false
        }
      } else {
        this.liked = false
        this.disliked = false
      }
    }
  }

  handleLike() {
    this.comService.likeComment(this.comment!.id).pipe(
      delay(500),
      switchMap(() => this.comService.getById(this.comment!.id))).subscribe({
        next: (response) => {
          this.comment = { ...response }
          this.changeRateUI()
        },
        error: (response) => console.log(response)
      })



  }

  handleDislike() {
    this.comService.dislikeComment(this.comment!.id).pipe(
      delay(500),
      switchMap(() => this.comService.getById(this.comment!.id))).subscribe({
        next: (response) => {
          this.comment = { ...response }
          this.changeRateUI()
        },
        error: (response) => console.log(response)
      })
  }

}
