import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { of } from 'rxjs'
import { delay, map} from 'rxjs/operators';

import { details, Movie } from '../interfaces/movies'


@Injectable({
  providedIn: 'root'
})
export class FilteredmoviesService {

  constructor(private http: HttpClient) { }

  getFilteredMovies(filteredmovies: details[]) {
    let finalMovies: Movie[] = [];

    const t$ = of(...filteredmovies).pipe(
      map(x => {
        return this.http.get <Movie>(`http://www.omdbapi.com/?i=${x['imdbID']}&apikey=434339bc`)
      }),
    )

    t$.subscribe(c => c.subscribe(s => {finalMovies.push(s)}))

    return of(finalMovies).pipe(delay(1000));
  }
}  



