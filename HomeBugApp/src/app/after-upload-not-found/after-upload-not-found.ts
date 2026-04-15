import { Component, NgModule } from '@angular/core';
import { InputField } from '../ui-components/input-field/input-field';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UnknownBugModel } from '../../models/unknown-bug.model';
import { UnknownBugService } from '../../services/unknown-bug.service';


@Component({
  selector: 'app-after-upload-not-found',
  imports: [InputField, FormsModule, CommonModule],
  templateUrl: './after-upload-not-found.html',
  styleUrl: './after-upload-not-found.scss',
})
export class AfterUploadNotFound {

  constructor(private uBugService: UnknownBugService, private router: Router) { }

  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0]
      const reader = new FileReader()
      reader.onload = () => this.previewUrl = reader.result
      reader.readAsDataURL(this.selectedFile)
    }
  }
  uBugData: UnknownBugModel = {
    picture_url: "../../assets/bee.jpg",
    description: "",
    color: "",
    size: "",
    wings: false,
    legs: 0,
    id: 0,
    comments: [],
    user: null
  }

  postUnknownBug(): void {

    console.log(this.uBugData)

    const formData = new FormData()

    if (this.selectedFile) {
      formData.append('file', this.selectedFile)
    }

    formData.append('picture_url', this.uBugData.picture_url)
    formData.append('description', this.uBugData.description)
    formData.append('color', this.uBugData.color)
    formData.append('size', this.uBugData.size)
    formData.append('wings', String(this.uBugData.wings))
    formData.append('legs', String(this.uBugData.legs))


    this.uBugService.post(formData).subscribe({
      next: (result) => console.log(result),
      error: (result) => console.log(result),
    })

    // this.router.navigate(["/search"])
  }




}
