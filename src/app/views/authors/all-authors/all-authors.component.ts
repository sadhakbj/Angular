import { AuthorService } from './../../../services/author/author.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-authors',
  templateUrl: './all-authors.component.html',
  styleUrls: ['./all-authors.component.css']
})
export class AllAuthorsComponent implements OnInit {
  authors: Object = {};

  constructor(private authorService: AuthorService) {}

  ngOnInit() {
    this.authorService.getAll().subscribe(
      data => {
        console.log(data);
      },
      err => {
        alert('error');
      }
    );
  }
}
