import { Component, OnInit } from '@angular/core';
import { Comment } from '../ui-components/comment/comment';
import { UnknownBugModel } from '../../models/unknown-bug.model';
import { UnknownBugService } from '../../services/unknown-bug.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../auth/auth.service';

type ReputationKey = -2 | -1 | 0 | 1 | 2;

@Component({
  selector: 'app-unknown-bug',
  imports: [Comment, CommonModule, FormsModule],
  templateUrl: './unknown-bug.html',
  styleUrl: './unknown-bug.scss',
})
export class UnknownBug implements OnInit {

  bug?: UnknownBugModel;
  countryCode = 'rs';
  commentText = ""
  userOwns: boolean = false
  public apirul = "http://localhost:3000/"

  reputations: Record<ReputationKey, string> = {
    "-2": "Bug Bait 🐞",
    "-1": "Web of Confusion 🕷️",
    "0": "Bug Spotter 🐜",
    "1": "Insect Insider 🐝",
    "2": "Bug Whisperer 🦋",
  }
  userReputation: ReputationKey = -1;

  constructor(
    private ubugService: UnknownBugService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    if (id) {
      this.ubugService.getById(id).subscribe({
        next: (response) => {
          this.bug = response;
          this.bug.comments = this.bug!.comments.sort((a, b) => b.rating - a.rating)
          if (this.bug.user?.id == this.authService.currentUserSubject.value.sub) {
            console.log("MOJ UBUG")
            this.userOwns = true
          }
          switch (true) {
            case (this.bug?.user!.reputation < -200):
              this.userReputation = -2;
              break;
            case (this.bug?.user!.reputation >= -200 && this.bug?.user!.reputation <= -50):
              this.userReputation = -1;
              break;
            case (this.bug?.user!.reputation > -50 && this.bug?.user!.reputation <= 50):
              this.userReputation = 0;
              break;
            case (this.bug?.user!.reputation > 50 && this.bug?.user!.reputation <= 200):
              this.userReputation = 1;
              break;
            case (this.bug?.user!.reputation > 200):
              this.userReputation = 2;
              break;
          }
        },
        error: (response) => console.log(response)
      })

    }
  }

  handleSubmitComment() {
    const com = {
      text: this.commentText,
      ubugId: this.bug?.id
    }

    this.commentService.postComment(com).subscribe({
      next: (response) => {
        this.bug?.comments.push(response)
        this.commentText = ""
      },
      error: (response) => console.log(response)
    })
  }

  removeComment(id: number) {
    if (!this.bug) return;
    const index = this.bug.comments.findIndex(c => c.id === id);
    if (index !== -1) {
      this.bug.comments.splice(index, 1);
    }
  }

  handleCorrect(userId: number) {
    if (this.bug) {
      this.ubugService.foundCorrect(this.bug!.id, userId).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(['/search'])
        },
        error: (response) => console.log(response)
      })
    }
  }
}
