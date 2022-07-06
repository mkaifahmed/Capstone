import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { UserService } from "./user.service";
import { BOOK } from "./book";

@Injectable({
  providedIn: "root"
})
export class BookService {
  private bookListURL: string;
  private addToFavURL: string;
  private getBookURL: string;
  private currentBook: BOOK;
  private bookList: BOOK[];

  constructor(private http: HttpClient, private userService: UserService) {
    this.bookListURL = "http://localhost:9876/getBooks";
    this.addToFavURL = "http://localhost:9876/save";
    this.getBookURL = "http://localhost:9876/getBook";
  }
  httpOptions(): object {
    return {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
      }
    };
  }
  getAllBooks(): Observable<any> {
    return this.http.get<any>(this.bookListURL, this.httpOptions());
  }
  setCurrentBook(currBook: BOOK) {
    this.currentBook = currBook;
  }
  getCurrentBook() {
    return this.currentBook;
  }
  setBookList(listOfBook: BOOK[]) {
    this.bookList = listOfBook;
  }
  getBookList() {
    return this.bookList;
  }
  getBooks(searchString: string) {
    return this.http.get<any>(
      `${this.bookListURL}/${searchString}`,
      this.httpOptions()
    );
  }
  getBook(OLID: string) {
    return this.http.get<any>(`${this.getBookURL}/${OLID}`, this.httpOptions());
  }

  saveAsFavBook(favBook): Observable<any> {
    return this.http.post<any>(this.addToFavURL, favBook, this.httpOptions());
  }
  deleteBooklist() {
    this.bookList = [];
  }
  getAllFavList(): Observable<any> {
    return this.http.get<any>(this.bookListURL, this.httpOptions());
  }
}
