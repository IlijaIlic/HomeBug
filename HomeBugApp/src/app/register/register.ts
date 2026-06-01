import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { InputField } from "../ui-components/input-field/input-field";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule, InputField, FormsModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  userData = {
    name: "",
    surname: "",
    email: "",
    password: "",
    gender: ""
  }

  regForm: FormGroup;

  constructor(public authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.regForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(32),
      ]],
      name: ['', [
        Validators.required
      ]],
      surname: ['', [
        Validators.required
      ]]
    })
  }

  handleRegister() {
    console.log(this.userData)

    if (this.regForm.valid) {
      this.authService.register(this.userData).subscribe({
        next: (res) => {
          console.log('Register uspešan', res)
          this.router.navigate(["/"])
        },
        error: (err) => {
          console.error('Register greška', err)
          alert("Register error!")
        }
      })
    } else {
      this.regForm.markAllAsTouched();
    }
  }
}
