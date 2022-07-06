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
}
