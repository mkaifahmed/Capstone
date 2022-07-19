import { Component, OnInit } from '@angular/core';
import { BookService } from "../book.service";
import { Router } from "@angular/router";
import { UserService } from "../user.service";

import { BOOK } from '../book';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = "bookkeeper";
  bookSearch: string = "";
  bookList: BOOK[] = [];
  constructor( 
    private router: Router,
    private bookService: BookService,
    private userService: UserService,
  ) 
    { }
    user: string = this.userService.userId;

  ngOnInit() {
  }

  gotoFav() {
    this.router.navigate(["favoriteList"]);
  }

  logOut() {
    this.bookService.deleteBooklist();
    localStorage.removeItem("accessToken");
    this.router.navigate(["login"]);
  }

  isLoggedIn(){
    return window.localStorage.getItem("accessToken") === "true";
  }

}
