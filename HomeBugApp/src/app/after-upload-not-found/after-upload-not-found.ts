import { Component } from '@angular/core';
import { InputField } from '../ui-components/input-field/input-field';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-after-upload-not-found',
  imports: [InputField, FormsModule],
  templateUrl: './after-upload-not-found.html',
  styleUrl: './after-upload-not-found.scss',
})
export class AfterUploadNotFound {

  constructor(private http: HttpClient, private router: Router) { }
  uBugData = {
    picture_url: "../../assets/bee.jpg",
    description: "",
    color: "",
    size: "",
    wings: false,
    legs: 0,
  }

  postUnknownBug(): void {
    this.http.post(`${environment.apiUrl}/unknown-bug`, this.uBugData)
      .subscribe(response => console.log(response));

      this.router.navigate(["/search"])
  }




}
