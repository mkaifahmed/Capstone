import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BOOK } from '../book';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FavoriteService } from '../favorite.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  constructor(private bookService: BookService,
    private router: Router,
    private userService: UserService,
    private favoriteService: FavoriteService) { }
  currentBook: BOOK;
  user: string = this.userService.userId;
  favorite: boolean = false;
  ngOnInit() {
    if (!localStorage.getItem("accessToken")) {
      this.router.navigate(["login"]);
    }
    this.currentBook = this.bookService.getCurrentBook();
    this.favoriteService.isFavorite(this.currentBook.url).subscribe(data => {
      this.favorite = data;
    }, errors => {
      console.log(errors)
    });
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
  favoriteOp() {
    if(this.favorite){
      this.favoriteService.deleteFromFavorite(this.currentBook.url).subscribe(data => {
        alert("Book Removed from Favorites");
        this.router.navigate(["favoriteList"]);
      }, errors => {
        this.router.navigate(["favoriteList"]);
      })
    } else  {
      this.favoriteService.saveToFavorite(this.currentBook).subscribe(data => {
        alert("Book Added to Favorities");
        this.router.navigate(["favoriteList"]);
      })
      
    }

  }
}
