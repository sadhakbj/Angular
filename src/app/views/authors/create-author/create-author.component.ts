import { ToastrService } from 'ngx-toastr';
import { AuthorService } from './../../../services/author/author.service';
import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form/form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.css']
})
export class CreateAuthorComponent implements OnInit {
  author: Object = {
    name: null,
    email: null,
    address: null,
    info: null
  };
  form;
  image = null;
  submitting: Boolean = false;

  constructor(
    private authorService: AuthorService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = new FormService();
  }

  ngOnInit() {}

  handleFileChange(event) {
    this.image = event.target.files[0];
  }

  onUserCreate($event) {
    $event.preventDefault();
    this.submitting = true;

    const formData = new FormData();

    if (this.image) {
      formData.append('image', this.image, this.image.name);
    }
    formData.append('name', this.author['name']);
    formData.append('email', this.author['email']);
    formData.append('info', this.author['info']);
    formData.append('address', this.author['address']);

    this.authorService.registerUser(formData).subscribe(
      response => {
        this.router.navigate(['/profile']);
        this.toastr.success('Success', 'Successfully added new author.');
      },
      err => {
        setTimeout(() => {
          this.submitting = false;
        }, 500);
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
