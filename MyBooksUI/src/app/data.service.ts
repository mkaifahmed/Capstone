import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public publish_date: string;
  public title: string;
  public url: string;
  public notes:string;
  public subtitle: string;
}
