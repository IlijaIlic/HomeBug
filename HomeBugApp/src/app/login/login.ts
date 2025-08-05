import { Component } from '@angular/core';
import { InputField } from "../ui-components/input-field/input-field";

@Component({
  selector: 'app-login',
  imports: [InputField],
  templateUrl: './login.html',
  styleUrl: '../register/register.scss'
})
export class Login {

}
