import { Component, NgModule, OnInit } from '@angular/core';
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
export class AfterUploadNotFound implements OnInit {

  constructor(private uBugService: UnknownBugService, private http: HttpClient) { }


  previewUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  countries: { code: string; name: string }[] = [];
  badCountry: boolean = true;

  uBugData: UnknownBugModel = {
    picture_url: "../../assets/bee.jpg",
    description: "",
    color: "",
    size: "",
    wings: false,
    legs: 0,
    id: 0,
    comments: [],
    user: null,
    countryCode: ""
  }

  postUnknownBug(): void {


    const formData = new FormData()

    if (this.selectedFile) {
      formData.append('file', this.selectedFile)
    }

    if (this.badCountry) {
      alert("Please select a valid country!")
      return
    }

    formData.append('picture_url', this.uBugData.picture_url)
    formData.append('description', this.uBugData.description)
    formData.append('color', this.uBugData.color)
    formData.append('size', this.uBugData.size)
    formData.append('wings', String(this.uBugData.wings))
    formData.append('legs', String(this.uBugData.legs))
    formData.append('countryCode', String(this.uBugData.countryCode))


    this.uBugService.post(formData).subscribe({
      next: (result) => console.log(result),
      error: (result) => console.log(result),
    })

    // this.router.navigate(["/search"])
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0]
      const reader = new FileReader()
      reader.onload = () => this.previewUrl = reader.result
      reader.readAsDataURL(this.selectedFile)
    }
  }

  ngOnInit(): void {
    this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=cca2,name')
      .subscribe(data => {
        this.countries = data.map(c => ({
          code: c.cca2,
          name: c.name.common
        }));
      });

  }

  validateCountry(event: any) {
    const value = event.target.value
    const match = this.countries.find(c => c.name === value)
    if (!match) {
      this.badCountry = true;
      this.uBugData.countryCode = "";   
    } else {
      this.badCountry = false;
      this.uBugData.countryCode = match.code.toLocaleLowerCase();  
    }
  }


}
