import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { FormService } from './../../services/form/form.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user: Object = {};
  public form;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = new FormService();
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  /**
   * Handle the login.
   * @param $event
   */
  handleLogin($event) {
    $event.preventDefault();
    this.authService.authenticate(this.user).subscribe(
      user => {
        this.authService.storeUser(user);
        this.router.navigate(['/profile']);
        this.toastr.success('Success.', 'Logged in successfully.');
      },
      err => {
        console.log(err);
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
