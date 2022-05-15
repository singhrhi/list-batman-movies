import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { FilteredmoviesService } from '../services/filteredmovies.service';
import { MovieDetailComponent } from './movie-detail.component';

fdescribe('MovieDetailComponent', () => {
  let fixture, comp, element, de, fs;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [ MovieDetailComponent ],
      providers: [ FilteredmoviesService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    comp = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;
  });

  beforeEach(inject([FilteredmoviesService], (s:any) => {
    fs = s;
  }));

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it(`should inject FilteredmoviesService`, () => {
    const testBedMovieService = TestBed.inject(FilteredmoviesService);
    expect(fs).toBe(testBedMovieService);
  });

  it('should call getFilteredMovies', fakeAsync(() => {
      spyOn(fs, 'getFilteredMovies').and.callThrough()
      spyOn(comp, 'sortByDates').and.callThrough()
      comp.allMovies = [{
        "Title":"Batman & Robin",
        "Year":"1997",
        "imdbID":"tt0118688",
        "Type":"movie",
        "Poster":"https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
    }];

    tick(1000);
    fixture.detectChanges();

    expect(comp.sortByDates).toHaveBeenCalled();
    expect(fs.getFilteredMovies).toHaveBeenCalled();
   }));

   it('should call getFilteredMovies and return observable and assign to aObs$', fakeAsync(() => {
    comp.allMovies = [{
      "Title":"Batman & Robin",
      "Year":"1997",
      "imdbID":"tt0118688",
      "Type":"movie",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
    }];

    tick(1000)  
    fixture.detectChanges();
  
    comp.aObs$.subscribe((data) => {
      expect(data[0]).toEqual(comp.allMovies);
    })
    
  }))

  it('should call getFilteredMovies', fakeAsync(() => {
    spyOn(fs, 'getFilteredMovies').and.callThrough()
    spyOn(comp, 'sortByDates').and.callThrough()
    comp.filteredMovies = [{
      "Title":"Batman & Robin",
      "Year":"1997",
      "imdbID":"tt0118688",
      "Type":"movie",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
    }];

    tick(1000);

    fixture.detectChanges();
    expect(comp.sortByDates).toHaveBeenCalled();
    expect(fs.getFilteredMovies).toHaveBeenCalled();
  }));

 it('should call getFilteredMovies and return observable and assign to fObs$', fakeAsync(() => {
    comp.filteredMovies = [{
      "Title":"Batman & Robin",
      "Year":"1997",
      "imdbID":"tt0118688",
      "Type":"movie",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
    }];

    tick(1000);
    fixture.detectChanges();

    comp.fObs$.subscribe((data) => {
      expect(data[0]).toEqual(comp.allMovies)
    })
  
  }))

  it('Should show error on screen', ()=>{
    comp.nmovies = false;
    
    fixture.detectChanges()

    let el = de.query(By.css('#err')).nativeElement;

    expect(el.innerHTML).toBe('OOPS ! Some Error occured. Please try after some time.')

  })

  it('Should show movie list on screen', fakeAsync(()=>{
    comp.nmovies = true;
    comp.aObs$ = of([{
      "Title":"Batman Begins",
      "Year":"2005",
      "Rated":"PG-13",
      "Released":"15 Jun 2005",
      "Runtime":"140 min",
      "Genre":"Action, Crime, Drama",
      "Director":"Christopher Nolan",
      "Writer":"Bob Kane, David S. Goyer, Christopher Nolan",
      "Actors":"Christian Bale, Michael Caine, Ken Watanabe",
      "Plot":"After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
      "Language":"English, Mandarin",
      "Country":"United States, United Kingdom",
      "Awards":"Nominated for 1 Oscar. 13 wins & 79 nominations total",
      "Poster":"https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
      "Ratings":[
         {
            "Source":"Internet Movie Database",
            "Value":"8.2/10"
         },
         {
            "Source":"Rotten Tomatoes",
            "Value":"84%"
         },
         {
            "Source":"Metacritic",
            "Value":"70/100"
         }
      ],
      "Metascore":"70",
      "imdbRating":"8.2",
      "imdbVotes":"1,419,394",
      "imdbID":"tt0372784",
      "Type":"movie",
      "DVD":"18 Oct 2005",
      "BoxOffice":"$206,863,479",
      "Production":"N/A",
      "Website":"N/A",
      "Response":"True"
   }])

    comp.aObs$.subscribe()

    tick(1000);
    fixture.detectChanges()

    let el = de.query(By.css('.movie-list__card__title--margin')).nativeElement;
    let el1 = de.query(By.css('.movie-list__card__info_button--text-color')).nativeElement;

    let el2 = de.query(By.css('.movie-list__card__info_button--rtime-margin')).nativeElement;
    let el3 = de.query(By.css('.movie-list__card__info_button--rel-margin')).nativeElement;

    let el4 = de.query(By.css('p')).nativeElement;


    expect(el.innerHTML).toBe('Batman Begins')
    expect(el1.innerHTML).toBe('PG-13')
    expect(el2.innerHTML).toBe('140 min')
    expect(el3.innerHTML).toBe('15 Jun 2005')
    expect(el4.innerHTML).toBe('After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.')
  }))

});
