import { Component, OnInit } from '@angular/core';

import { MovieService } from './services/movie.service'
import {Movies, details} from './interfaces/movies'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  movies!: details[];
  filteredMovies!: details[];
  allMovies!: details[];

  constructor(private movie: MovieService) { }

  ngOnInit(): void {
    this.allMovies  = [];
    this.filteredMovies = [];
    this.movies = [];
    this.movie.getMovies()
      .subscribe( {
        next : (data: Movies)  => {
          this.movies = data.Search;
          this.allMovies = data.Search;
        },
        error : (err:any) => {
          console.log(err);
        }
      })
  }

  clearFilters(evt: void){
    this.allMovies = [...this.allMovies];
  }

  calcDecade(evt: any){
    this.filteredMovies = evt;
  }
}
