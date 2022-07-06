import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BOOK } from "./book";

@Injectable({
  providedIn: "root"
})
export class FavoriteService {
  private isFavoriteUrl: string = "http://localhost:9876/isFavorite?url=";
  private saveToFavoriteUrl: string = "http://localhost:9876/save";
  private deleteFromFavoriteUrl: string = "http://localhost:9876/delete?url=";
  private getAllFavoriteUrl: string = "http://localhost:9876/list";
  constructor(private http: HttpClient) {}

  httpOptions(): object {
    return {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken")
      }
    };
  }

  isFavorite(url: string): Observable<any> {
    return this.http.get<any>(`${this.isFavoriteUrl}${url}`, this.httpOptions());
  }
  saveToFavorite(bookDetail: BOOK): Observable<any> {
    return this.http.post(this.saveToFavoriteUrl, bookDetail, this.httpOptions());
  }
  deleteFromFavorite(url: string): Observable<any> {
    return this.http.delete<any>(
      `${this.deleteFromFavoriteUrl}${url}`,
      this.httpOptions()
    );
  }
  getAllFavorite(): Observable<any> {
    return this.http.get<any>(this.getAllFavoriteUrl, this.httpOptions());
  }
}
