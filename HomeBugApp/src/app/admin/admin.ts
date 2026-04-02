import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { UnknownBugModel } from '../../models/unknown-bug.model';
import { UnknownBugService } from '../../services/unknown-bug.service';
import { UserService } from '../../services/user.service';
import { UserModel } from '../../models/user.model';
import { KnownBugModel } from '../../models/known-bug.model';
import { CommentModel } from '../../models/comment.model';
import { KnownBugService } from '../../services/known-bug-service';
import { CommentService } from '../../services/comment.service';
import { CommonModule } from '@angular/common';
import { RegionModel } from '../../models/region.model';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {

  constructor(
    private ubugService: UnknownBugService,
    private userService: UserService,
    private kbugService: KnownBugService,
    private commService: CommentService,
  ) { }

  entityShown: string = "users";
  isCreating: boolean = false

  users?: UserModel[] = [];
  selUser?: UserModel | null;

  kbugs?: KnownBugModel[] = [];
  selBug?: KnownBugModel | null;

  ubugs?: UnknownBugModel[] = [];
  selUbug?: UnknownBugModel | null;

  comments?: CommentModel[] = [];
  selComment?: CommentModel | null;

  regions?: RegionModel[] = [];
  allRegions?: RegionModel[] = [];
  selRegion: RegionModel = {
    id: -1,
    name: "",
    coord: [[], [], [], []]
  };

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

    this.kbugService.getAllRegions().subscribe({
      next: (response) => {
        this.regions = response
        this.allRegions = response
      },
      error: (response) => console.log(response)
    })

    this.allRegions = this.regions
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

    this.commService.getAll().subscribe({
      next: (response) => this.comments = response,
      error: (response) => console.log(response)
    })
  }

  handleRegionsClick() {
    this.entityShown = 'regions'

    this.kbugService.getAllRegions().subscribe({
      next: (response) => this.regions = response,
      error: (response) => console.log(response)
    })
  }

  handleUserInfo(userData: UserModel) {
    this.selUser = userData
    console.log(this.selUser)
  }

  handleKbugInfo(kBugData: KnownBugModel) {
    this.selBug = kBugData
    this.regions = this.allRegions

    this.regions = this.regions!.filter(
      reg => !this.selBug?.regions.some(r => r.id === reg.id)
    );
    console.log(this.selBug)
    console.log(this.regions)
  }

  handleUbugInfo(uBugData: UnknownBugModel) {
    console.log(uBugData)
  }

  handleCommInfo(commData: CommentModel) {
    console.log(commData)
  }

  switchChange() {
    this.isCreating = !this.isCreating
  }

  handleRegionInfo(regionData: RegionModel) {
    this.selRegion = regionData
    console.log(this.selRegion)
  }

  handleDeleteRegion(region: RegionModel) {
    this.kbugService.deleteRegion(region.id).subscribe({
      next: (response) => {
        console.log(response)
        this.regions = this.regions!.filter(item => item !== region)
      },
      error: (response) => console.log(response)
    })
  }

  handleSubmitRegions() {
    if (this.isCreating) {
      console.log(this.selRegion)
      const newRegion = {
        name: this.selRegion.name,
        coord: this.selRegion.coord
      };

      this.kbugService.postRegion(newRegion).subscribe({
        next: (response) => this.regions?.push(response),
        error: (response) => console.log(response)
      })


      this.selRegion = {
        id: -1,
        name: "",
        coord: [[], [], [], []]
      };
    } else {
      console.log("UPDATEz")
    }
  }

  addRegionToKbug(addRegion: RegionModel) {
    this.selBug?.regions.push(addRegion)
    this.regions = this.regions!.filter(
      reg => !this.selBug?.regions.some(r => r.id === reg.id)
    );
  }
}
