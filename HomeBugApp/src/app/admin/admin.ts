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
import { HabitatsService } from '../../services/habitats.service';

@Component({
  selector: 'app-admin',
  imports: [FormsModule, CommonModule, FormsModule, NgIcon],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  constructor(
    private ubugService: UnknownBugService,
    private userService: UserService,
    private kbugService: KnownBugService,
    private commService: CommentService,
    public habitatService: HabitatsService
  ) { }

  public apiUrl = "http://localhost:3000/"
  entityShown: string = "users";
  isCreating: boolean = false

  previewUrl: string | ArrayBuffer | null = null;
  imgArray: File[] = [];
  index: number = 0;

  // USERS 
  users?: UserModel[] = [];
  filteredUsers?: UserModel[] = []
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
  usersQuery: string = ""


  handleUsersClick() {
    this.entityShown = 'user'

    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response
        this.filteredUsers = [...this.users]
      },
      error: (response) => console.log(response)
    })
  }

  handleUserSearch(event: Event) {
    this.usersQuery = (event.target as HTMLInputElement).value.toLocaleLowerCase().trim()

    this.filteredUsers = this.usersQuery ? this.users?.filter(user => user.email.toLocaleLowerCase().includes(this.usersQuery)) : [...this.users!];
  }

  handleUserInfo(userData: UserModel) {
    this.selUser = userData
    console.log(this.selUser)
  }

  handleDeleteUser(user: UserModel) {
    this.userService.deleteById(user.id).subscribe({
      next: (response) => {
        console.log(response)
        this.users = this.users!.filter(item => item !== user)
        this.filteredUsers = [...this.users]
        this.usersQuery = ""
      }, error: (response) => console.log(response)
    })
  }



  // KNOWNBUG
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

  selectKBug(kBugData: KnownBugModel) {
    this.selBug = {
      ...kBugData,
      picture_urls: [...kBugData.picture_urls],
      regions: [...kBugData.regions],
      habitats: [...kBugData.habitats],
    }
  }

  handleKbugInfo(kBugData: KnownBugModel) {
    this.selectKBug(kBugData)
    const tempHabitat = this.selBug.habitats.join(';')
    this.selBug.habitats = []
    this.selBug.habitats[0] = tempHabitat
    this.regions = this.allRegions

    this.regions = this.regions!.filter(
      reg => !this.selBug?.regions.some(r => r.id === reg.id)
    );
    console.log(this.selBug)
    console.log(this.regions)
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

  async handleSubmitKBug() {
    if (this.isCreating) {
      const formData = new FormData()

      await Promise.all(this.selBug.picture_urls.map((url, i) =>
        fetch(this.apiUrl + url)
          .then(res => res.blob())
          .then(blob => {
            const filename = url.split('/').pop() || `image_${i}.jpg`;
            this.imgArray.push(new File([blob], filename, { type: blob.type }));
          })
      ))

      this.imgArray.forEach(file => {
        formData.append('files', file);
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
          this.selectKBug(response)
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
      this.imgArray = []
      this.previewUrl = null
    }
    else {
      const formData = new FormData();

      formData.append('picture_urls', JSON.stringify(this.selBug.picture_urls));

      this.imgArray.forEach(file => formData.append('files', file));

      formData.append('common_name', this.selBug.common_name);
      formData.append('latin_name', this.selBug.latin_name);
      formData.append('taxonomy', JSON.stringify({
        taxonomyClass: this.selBug.taxonomy.taxonomyClass,
        order: this.selBug.taxonomy.order,
        family: this.selBug.taxonomy.family,
        genus: this.selBug.taxonomy.genus,
        species: this.selBug.taxonomy.species,
      }));
      formData.append('overview', this.selBug.overview);
      formData.append('regionsIds', JSON.stringify(this.selBug.regions.map(r => r.id)));
      formData.append('habitats', JSON.stringify(
        this.selBug.habitats[0].split(';').map((s: string) => s.trim()).filter((s: string) => s.length)
      ));
      formData.append('behaviour', this.selBug.behaviour);
      formData.append('body_type', this.selBug.body_type);
      formData.append('color', this.selBug.color);
      formData.append('diet', this.selBug.diet);
      formData.append('no_legs', String(this.selBug.no_legs));
      formData.append('size', this.selBug.size);
      formData.append('danger_to_humans', String(this.selBug.danger_to_humans));
      formData.append('stings', String(this.selBug.stings));
      formData.append('venomous', String(this.selBug.venomous));
      formData.append('wings', String(this.selBug.wings));
      formData.append('bites', String(this.selBug.bites));

      this.kbugService.patchKBug(this.selBug.id, formData).subscribe({
        next: (response) => {
          const i = this.kbugs!.findIndex(b => b.id === this.selBug.id);
          if (i !== -1) this.kbugs![i] = response;
          console.log(response);
        },
        error: (response) => console.log(response)
      });
    }
  }

  // UNKNOWN BUG
  ubugs?: UnknownBugModel[] = [];
  selUbug?: UnknownBugModel | null;

  handleUnknownClick() {
    this.entityShown = 'unknown'

    this.ubugService.getAll().subscribe({
      next: (response) => this.ubugs = response[0],
      error: (response) => console.log(response)
    })
  }

  handleUbugInfo(uBugData: UnknownBugModel) {
    this.selUbug = { ...uBugData }
  }

  handleDeleteUbug(ubug: UnknownBugModel) {
    this.ubugService.deleteById(ubug.id).subscribe({
      next: (response) => {
        console.log(response)
        this.ubugs = this.ubugs!.filter(item => item !== ubug)
      }, error: (response) => console.log(response)
    })
  }

  //COMMENTS
  comments?: CommentModel[] = [];
  selComment?: CommentModel | null;

  handleCommentsClick() {
    this.entityShown = 'comments'

    this.commService.getAll().subscribe({
      next: (response) => this.comments = response,
      error: (response) => console.log(response)
    })
  }

  handleCommInfo(commData: CommentModel) {
    this.selComment = { ...commData }
  }

  handleDeleteComment(comm: CommentModel) {
    this.commService.deleteById(comm.id).subscribe({
      next: (response) => {
        console.log(response)
        this.comments = this.comments!.filter(item => item !== comm)
      }, error: (response) => console.log(response)
    })
  }

  //REGIONS
  regions?: RegionModel[] = [];
  allRegions?: RegionModel[] = [];
  selRegion: RegionModel = {
    id: -1,
    name: "",
    coord: [[], [], [], []]
  };

  handleRegionsClick() {
    this.entityShown = 'regions'

    this.kbugService.getAllRegions().subscribe({
      next: (response) => this.regions = response,
      error: (response) => console.log(response)
    })
  }

  handleRegionInfo(regionData: RegionModel) {
    this.selRegion = { ...regionData }
    console.log(this.selRegion)
  }

  handleDeleteRegion(region: RegionModel) {
    this.kbugService.deleteRegion(region.id).subscribe({
      next: (response) => {
        console.log(response)
        this.regions = this.regions!.filter(item => item !== region)
        this.selRegion = {
          id: -1,
          name: "",
          coord: [[], [], [], []]
        };
      },
      error: (response) => console.log(response)
    })
  }

  handleSubmitRegions() {
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

  }

  // OTHER
  switchChange() {
    this.isCreating = !this.isCreating
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

  deleteUploadedImage(urlIndex: number) {
    this.selBug.picture_urls.splice(urlIndex, 1)
  }
}
