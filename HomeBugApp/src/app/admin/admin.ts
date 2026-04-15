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
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CommonModule, FormsModule, NgIcon],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {

  public apiUrl = "http://localhost:3000/"

  constructor(
    private ubugService: UnknownBugService,
    private userService: UserService,
    private kbugService: KnownBugService,
    private commService: CommentService,
  ) { }

  previewUrl: string | ArrayBuffer | null = null;
  imgArray: File[] = [];
  index: number = 0;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      for (let i = 0; i < input.files.length; i++) {
        this.imgArray!.push(input.files[i])
      }
      this.changeImage()
    }
  }

  changeImage() {
    if (this.imgArray) {
      const reader = new FileReader()
      reader.onload = () => this.previewUrl = reader.result
      reader.readAsDataURL(this.imgArray![this.index])
    }
  }

  nextImage() {
    if (this.imgArray) {
      this.index = (this.index + 1) % this.imgArray.length
      this.changeImage()
    }
  }

  prevImage() {
    if (this.imgArray) {
      this.index = (this.index - 1 + this.imgArray.length) % this.imgArray.length
      this.changeImage()
    }
  }

  deleteImage() {
    if (this.imgArray) {
      this.imgArray.splice(this.index, 1)
      this.nextImage()
    }
  }

  deleteUploadedImage() {

  }

  entityShown: string = "users";
  isCreating: boolean = false

  users?: UserModel[] = [];
  selUser: UserModel = {
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

  kbugs?: KnownBugModel[] = [];
  selBug: KnownBugModel = {
    id: -1,
    common_name: "",
    latin_name: "",
    picture_urls: ["Test"],
    taxonomy: {
      id: -1,
      taxonomyClass: "",
      order: "",
      family: "",
      genus: "",
      species: "",
    },
    overview: "",
    regions: [],
    habitats: [],
    behaviour: "",
    body_type: "",
    color: "",
    diet: "",
    no_legs: 0,
    size: "",
    danger_to_humans: false,
    stings: false,
    venomous: false,
    wings: false,
    bites: false,
  };


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
      next: (response) => {
        this.kbugs = response;
        console.log(response)
      },
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
    const tempHabitat = kBugData.habitats.join(';')
    this.selBug.habitats = []
    this.selBug.habitats[0] = tempHabitat
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

  handleDeleteKBug(kbug: KnownBugModel) {
    this.kbugService.deleteKBug(kbug.id).subscribe({
      next: (response) => {
        console.log(response)
        this.kbugs = this.kbugs!.filter(item => item !== kbug)
      },
      error: (response) => console.log(response)
    })
  }

  handleDeleteComment(comm: CommentModel) {
    this.commService.deleteById(comm.id).subscribe({
      next: (response) => {
        console.log(response)
        this.comments = this.comments!.filter(item => item !== comm)
      }, error: (response) => console.log(response)
    })
  }

  handleDeleteUbug(ubug: UnknownBugModel) {
    this.ubugService.deleteById(ubug.id).subscribe({
      next: (response) => {
        console.log(response)
        this.ubugs = this.ubugs!.filter(item => item !== ubug)
      }, error: (response) => console.log(response)
    })
  }

  handleDeleteUser(user: UserModel) {
    this.userService.deleteById(user.id).subscribe({
      next: (response) => {
        console.log(response)
        this.users = this.users!.filter(item => item !== user)
      }, error: (response) => console.log(response)
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
      console.log("UPDATE!")
    }
  }

  addRegionToKbug(addRegion: RegionModel) {
    this.selBug.regions.push(addRegion)
    this.regions = this.regions!.filter(
      reg => !this.selBug?.regions.some(r => r.id === reg.id)
    );
  }

  removeRegionFromKbug(removeRegion: RegionModel) {
    this.selBug.regions = this.selBug.regions.filter(item => item !== removeRegion)
    this.regions = this.allRegions

    this.regions = this.regions!.filter(
      reg => !this.selBug?.regions.some(r => r.id === reg.id)
    );
  }

  handleSubmitKBug() {
    if (this.isCreating) {
      const formData = new FormData()


      this.imgArray.forEach(file => {
        formData.append('files', file); // key must match backend interceptor
      });

      formData.append('common_name', this.selBug.common_name)
      formData.append('latin_name', this.selBug.latin_name)
      formData.append('taxonomy', JSON.stringify({
        taxonomyClass: this.selBug.taxonomy.taxonomyClass,
        order: this.selBug.taxonomy.order,
        family: this.selBug.taxonomy.family,
        genus: this.selBug.taxonomy.genus,
        species: this.selBug.taxonomy.species,
      }));

      formData.append('overview', this.selBug.overview)
      formData.append('regionsIds', JSON.stringify(this.selBug.regions.map(r => r.id)));
      formData.append('habitats', JSON.stringify(
        this.selBug.habitats[0].split(';').map(s => s.trim()).filter(s => s.length)
      ));

      formData.append('behaviour', this.selBug.behaviour)
      formData.append('body_type', this.selBug.body_type)
      formData.append('color', this.selBug.color)
      formData.append('diet', this.selBug.diet)
      formData.append('no_legs', String(this.selBug.no_legs))
      formData.append('size', this.selBug.size)
      formData.append('danger_to_humans', String(this.selBug.danger_to_humans))
      formData.append('stings', String(this.selBug.stings))
      formData.append('venomous', String(this.selBug.venomous))
      formData.append('wings', String(this.selBug.wings))
      formData.append('bites', String(this.selBug.bites))


      this.kbugService.postKBug(formData).subscribe({
        next: (response) => {
          this.kbugs?.push(response);
          console.log(response)
        },
        error: (response) => console.log(response)
      })

      this.selBug = {
        id: -1,
        common_name: "",
        latin_name: "",
        picture_urls: ["Test"],
        taxonomy: {
          id: -1,
          taxonomyClass: "",
          order: "",
          family: "",
          genus: "",
          species: "",
        },
        overview: "",
        regions: [],
        habitats: [],
        behaviour: "",
        body_type: "",
        color: "",
        diet: "",
        no_legs: 0,
        size: "",
        danger_to_humans: false,
        stings: false,
        venomous: false,
        wings: false,
        bites: false,
      };
      this.regions = this.allRegions
    }
    else {

    }
  }
}
