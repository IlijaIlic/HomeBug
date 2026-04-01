import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { UnknownBugModel } from '../../models/unknown-bug.model';
import { UnknownBugService } from '../../services/unknown-bug.service';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { KnownBugModel } from '../../models/known-bug.model';
import { CommentModel } from '../../models/comment.model';
import { KnownBugService } from '../../services/known-bug-service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {

  constructor(
    private ubugService: UnknownBugService,
    private userService: UserService,
    private kbugService: KnownBugService
  ) { }

  entityShown: string = "users";

  users?: UserModel[] = [];
  kbugs?: KnownBugModel[] = [];
  ubugs?: UnknownBugModel[] = [];
  comments?: CommentModel[] = [];

  handleUsersClick() {
    this.entityShown = 'user'

    this.userService.getAll().subscribe({
      next: (response) => this.users = response,
      error: (response) => console.log(response)
    })
  }

  handleKnownClick() {
    this.entityShown = 'known'

    this.kbugService.getAll().subscribe({
      next: (response) => this.kbugs = response,
      error: (response) => console.log(response)
    })
  }

  handleUnknownClick() {
    this.entityShown = 'unknown'

    this.ubugService.getAll().subscribe({
      next: (response) => this.ubugs = response,
      error: (response) => console.log(response)
    })
  }

  handleCommentsClick() {
    this.entityShown = 'comments'
  }

  handleUserInfo(userData: UserModel) {
    console.log(userData)
  }

  handleKbugInfo(kBugData: KnownBugModel){
    console.log(kBugData)
  }

   handleUbugInfo(uBugData: UnknownBugModel){
    console.log(uBugData)
  }

}
