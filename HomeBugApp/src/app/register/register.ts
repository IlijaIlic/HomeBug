import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InputField } from "../ui-components/input-field/input-field";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule, InputField, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  userData = {
    name: "",
    surname: "",
    email: "",
    password: "",
    gender: "male"
  }

  constructor(public authService: AuthService, private router: Router) { }

  handleRegister() {
    console.log(this.userData)

    this.authService.register(this.userData).subscribe({
      next: (res) => console.log('Register uspešan', res),
      error: (err) => console.error('Register greška', err)
    })

    this.router.navigate(["/"])

    
  }
}
