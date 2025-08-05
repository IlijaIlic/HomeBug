import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputField } from "../ui-components/input-field/input-field";

@Component({
  selector: 'app-register',
  imports: [RouterModule, InputField],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

}
