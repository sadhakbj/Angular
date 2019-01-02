import { Component, OnInit } from '@angular/core';
import { FormService } from './../../services/form/form.service';
import { AuthService } from './../../services/auth.service';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: Object = {};
  form;

  /**
   * RegisterComponent constructor
   * @param authService
   * @param toastr
   */
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = new FormService();
  }

  ngOnInit() {}

  /**
   * Handle user register.
   * @param $event
   */
  onUserRegister($event) {
    $event.preventDefault();

    this.authService.registerUser(this.user).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/login']);
        this.toastr.success('Success.', 'Sucessfully created a new account');
      },
      err => {
        let message = 'Something is wrong';
        if (err.status === 422) {
          this.form.record(err.error.errors);
          message = 'The form has validation errors';
        }
        this.toastr.error('Error!', message, {
          timeOut: 3000
        });
      }
    );
  }
}
