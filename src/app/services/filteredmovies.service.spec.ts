import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FilteredmoviesService } from './filteredmovies.service';

fdescribe('FilteredmoviesService', () => {
  let service: FilteredmoviesService;
  let fs: FilteredmoviesService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilteredmoviesService);
  });

  beforeEach(async () => {
    let de: HttpClient
    fs = new FilteredmoviesService(de);
  });

  it('should be created', () => {
    expect(fs).toBeTruthy();
  });

  it('should call getFilteredMovies with proper argument', () => { 
    const t=   [{
      "Title":"Batman Begins",
      "Year":"2005",
      "imdbID":"tt0372784",
      "Type":"movie",
      "Poster":"https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
   }]

   spyOn(fs, 'getFilteredMovies').and.callFake((t)=>{
    return of(null);
   })

   fs.getFilteredMovies(t)
   expect(fs.getFilteredMovies).toHaveBeenCalledWith(t);
  })
});
