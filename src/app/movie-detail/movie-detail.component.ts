import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { details, Movie } from '../interfaces/movies'
import { FilteredmoviesService } from '../services/filteredmovies.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  fObs$:Observable<Movie[]>;
  aObs$:Observable<Movie[]>;

  cmovies!: boolean;
  nmovies!:boolean;

  constructor(private movies: FilteredmoviesService) { }

  ngOnInit(): void {
  }

  @Input()
  set allMovies(value: details[]) {    
    if(value && value.length > 0) {
      const fMovies = this.movies.getFilteredMovies(value);
      fMovies.subscribe( {
          next: (data) => {
            this.sortByDates(data);
            this.aObs$ = of(data.slice(0, 10));
          }, 
          error: (err) => {
            console.log(err);
            this.nmovies = false;
          }
        })
      this.cmovies = false;
      this.nmovies = true;
    }
  }
  
  @Input()
  set filteredMovies(value: details[]) {
    if(value && value.length > 0) {
      const fMovies = this.movies.getFilteredMovies(value);
        fMovies.subscribe({
          next: (data: Movie[]) => {
            this.sortByDates(data);
            this.fObs$ = of( data.slice(0, 10));
          }, 
          error : (err) => {
            console.log(err);
            this.nmovies = false;
          }
        })
      this.cmovies = true;
      this.nmovies = true;
    }
  }

  private sortByDates(data: Movie[]){
    data.sort(function(a, b) {
      let c = new Date(a['Released']).getTime();
      let d = new Date(b['Released']).getTime();
      return +d - +c;
    });
  }
}
