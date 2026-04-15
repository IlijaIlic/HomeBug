import { Component, OnInit } from '@angular/core';
import { UnknownBugImage } from '../ui-components/unknown-bug-image/unknown-bug-image';
import { UserService } from '../../services/user.service';
import { AuthService } from '../auth/auth.service';
import { UserModel } from '../../models/user.model';
import { switchMap } from 'rxjs';
import { RouterLink, RouterModule } from "@angular/router";

type Tab = 'info' | 'scans' | 'saved'
type ReputationKey = -2 | -1 | 0 | 1 | 2;

interface AuthUserModel {
  sub: number;
  email: string
}

@Component({
  selector: 'app-user-profile',
  imports: [UnknownBugImage, RouterLink, RouterModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile implements OnInit {

  constructor(private userService: UserService, private authService: AuthService) { }

  public user: UserModel = {
    id: -1,
    name: "",
    surname: "",
    email: "",
    gender: "",

    reputation: 0,

    comments_helping_others: 0,
    known_scans: [],
    other_users_rated: 0,
    saved_bugs: [],
    unknown_bugs_scanned: 0,
    unknown_scans: [],
  };

  reputations: Record<ReputationKey, string> = {
    "-2": "Bug Bait 🐞",
    "-1": "Web of Confusion 🕷️",
    "0": "Bug Spotter 🐜",
    "1": "Insect Insider 🐝",
    "2": "Bug Whisperer 🦋",
  }

  userReputation: ReputationKey = -1;
  active_tab: Tab = 'info'


  ngOnInit(): void {
    this.authService.currentUser$.pipe(
      switchMap((usr: AuthUserModel) => this.userService.getById(usr.sub))
    ).subscribe({
      next: (result) => this.user = result,
      error: (result) => console.log(result)
    })

    switch (true) {
      case (this.user!.reputation < -200):
        this.userReputation = -2;
        break;
      case (this.user!.reputation >= -200 &&  this.user!.reputation < -100 ):
        this.userReputation = -1;
        break;
      case (this.user!.reputation > -50 &&  this.user!.reputation <= 50 ):
        this.userReputation = 0;
        break;
      case (this.user!.reputation > 50 &&  this.user!.reputation <= 200 ):
        this.userReputation = 1;
        break;
      case (this.user!.reputation > 200):
        this.userReputation = 2;
        break;

    }

  }





  selectTab(tab: Tab) {
    this.active_tab = tab
  }

}
