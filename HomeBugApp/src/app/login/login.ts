import { Component } from '@angular/core';
import { InputField } from "../ui-components/input-field/input-field";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule, InputField],
  templateUrl: './login.html',
  styleUrl: '../register/register.scss'
})
export class Login {

}
