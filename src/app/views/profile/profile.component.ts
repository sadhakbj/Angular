import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}
  currentUser: Object = {};

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(data => {
      this.currentUser = data;
    });
  }
}
