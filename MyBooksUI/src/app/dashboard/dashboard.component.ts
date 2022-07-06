import { Component, OnInit } from "@angular/core";
import { BookService } from "../book.service";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { BOOK } from '../book';

@Component({
  selector: "app-root",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  title = "bookkeeper";
  bookSearch: string = "";
  bookList: BOOK[] = [];
  constructor(
    private router: Router,
    private bookService: BookService,
    private userService: UserService
  ) {}
  currentBook: object = {};
  user: string = this.userService.userId;
  ngOnInit() {
    if (!localStorage.getItem("accessToken")) {
      this.router.navigate(["login"]);
    }
    this.bookList = this.bookService.getBookList();
    if (!this.bookList || (this.bookList && this.bookList.length == 0)) {
        const randSearch=["action", "adventures", "stories", "novel", "drama"];

        this.bookService.getBooks(randSearch[Math.floor(Math.random()*5)]).subscribe((data: any) => {
        this.bookList = data.docs.length>10 ? data.docs.slice(0,10): data.docs;
        this.bookService.setBookList(this.bookList);
      });
    }
  }
  gotoFav() {
    this.router.navigate(["favoriteList"]);
  }
  bookGet() {
    console.log(this.bookSearch);
    this.bookService.getBooks(this.bookSearch).subscribe((data: any) => {
      this.bookList = data.docs;
      this.bookService.setBookList(this.bookList);
    });
  }
  booKTag(olid) {
    this.bookService.getBook(olid).subscribe((dataFrom: any) => {
      this.bookService.setCurrentBook(dataFrom);
      this.bookSearch = "";
      this.router.navigate(["bookDetail"]);
    });
  }
  logOut() {
    this.bookService.deleteBooklist();
    localStorage.removeItem("accessToken");
    this.router.navigate(["login"]);
  }
  showRecommendations(){
    if (!localStorage.getItem("accessToken")) {
      this.router.navigate(["login"]);
    }
    this.bookList = this.bookService.getBookList();
    if (this.bookList || (this.bookList && this.bookList.length != 0)) {
        const randSearch=["action", "adventures", "stories", "novel", "drama"];

        this.bookService.getBooks(randSearch[Math.floor(Math.random()*5)]).subscribe((data: any) => {
        this.bookList = data.docs.length>10 ? data.docs.slice(0,10): data.docs;
        this.bookService.setBookList(this.bookList);
      });
    }
  }

}
