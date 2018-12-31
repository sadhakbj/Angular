import { FormService } from './../../services/form/form.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String = 'apple';
  email: String;
  password: String;
  password_confirmation: String;

  formService;

  errors: Object = {};

  constructor(private authService: AuthService) {
    this.formService = FormService;
  }

  ngOnInit() {
  }

  onUserRegister($event) {
    $event.preventDefault();
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    }


    this.authService.registerUser(user).subscribe(d => {
      console.log(d)
    }, err => {
      if (err.status === 422) {
        this.formService.record(err.error.errors);
      }
    });


  }

}
