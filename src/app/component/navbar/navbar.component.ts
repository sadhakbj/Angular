import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appName: String = 'ngBook';
  /**
   *
   * @param AuthService authService
   * @param Router router
   * @param ToastrService toastr
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  /**
   * Handle log out.
   * @return false
   */
  handleLogOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
    this.toastr.success('Success', 'Logged out successfully.');

    return false;
  }
}
