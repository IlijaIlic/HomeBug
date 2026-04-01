import { Component } from '@angular/core';
import { InputField } from "../ui-components/input-field/input-field";
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule, InputField, FormsModule],
  templateUrl: './login.html',
  styleUrl: '../login/login.scss'
})
export class Login {

  loginData = {
    email: "",
    password: ""
  }

  constructor(public authService: AuthService, private router: Router) { }

  handleLogin(){
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (res) => console.log('Login uspešan', res),
      error: (err) => console.error('Login greška', err)
    })
    this.router.navigate(["/"])

  }
}
