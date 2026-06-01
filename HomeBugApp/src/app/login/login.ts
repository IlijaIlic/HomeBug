import { Component, OnInit } from '@angular/core';
import { InputField } from "../ui-components/input-field/input-field";
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule, InputField, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: '../login/login.scss'
})
export class Login implements OnInit {

  loginData = {
    email: "",
    password: ""
  }
  logForm: FormGroup;


  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.logForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
      ]]
    })
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/'])
    }
  }

  handleLogin() {

    if (this.logForm.valid) {
      this.authService.login(this.loginData.email, this.loginData.password).subscribe({
        next: (res) => {
          console.log('Login uspešan', res)
          window.location.reload()
        },
        error: (err) => console.error('Login greška', err)
      })
    } else {
      this.logForm.markAllAsTouched();
    }
  }
}
