import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '../favorite.service';
import { BOOK } from '../book';
import { BookService } from '../book.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-favorit-list',
  templateUrl: './favorit-list.component.html',
  styleUrls: ['./favorit-list.component.scss']
})
export class FavoritListComponent implements OnInit {
  private favoriteList: BOOK[]=[];
  bookList: BOOK[] = [];
  constructor(private router: Router,
    private favoriteService: FavoriteService,
    private bookService: BookService,
    private userService: UserService) { }
  private user: string = this.userService.userId;
  ngOnInit() {
    if (!localStorage.getItem("accessToken")) {
      this.router.navigate(["login"]);
    }
    this.favoriteService.getAllFavorite().subscribe(data => {
        this.favoriteList = data;
    })
  }
  booKTag(item) {
    this.bookService.setCurrentBook(item);
    this.router.navigate(["bookDetail"]);
  }
  clickBack() {
    this.router.navigate(["dashboard"]);
  }
  logOut() {
    this.bookService.deleteBooklist();
    localStorage.removeItem("accessToken");
    this.router.navigate(["login"]);
  }
  gotoFav() {
    this.router.navigate(["favoriteList"]);
  }
  showRecommendations(){
    this.router.navigate(["dashboard"]);
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
