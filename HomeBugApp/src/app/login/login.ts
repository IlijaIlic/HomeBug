import { Component, OnInit } from '@angular/core';
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
export class Login implements OnInit{

  loginData = {
    email: "",
    password: ""
  }

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/'])
    }
  }

  handleLogin() {
    this.authService.login(this.loginData.email, this.loginData.password).subscribe({
      next: (res) => {
        console.log('Login uspešan', res)
        window.location.reload()
      },
      error: (err) => console.error('Login greška', err)
    })

  }
}
