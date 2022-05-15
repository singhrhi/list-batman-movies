import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Movies} from '../interfaces/movies'

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get <Movies>('https://www.omdbapi.com/?s=Batman&apikey=434339bc');
  }
}
