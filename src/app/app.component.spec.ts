import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { MovieService } from './services/movie.service';
import { DecadeComponent } from './decade/decade.component'



fdescribe('AppComponent', () => {
  let fixture:any, comp:any, element:any, de:any, ms:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        DecadeComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ MovieService ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;
  });

  beforeEach(inject([MovieService], (s:any) => {
    ms = s;
  }));

  it('should create the app', () => {
    expect(comp).toBeTruthy();
  });

  it(`should inject Movie service`, () => {
    const testBedMovieService = TestBed.inject(MovieService);
    expect(ms).toBe(testBedMovieService);
  });

  it(`should call the getMovies inside ngOninit`, async() => {
    const gm = spyOn(ms, 'getMovies').and.callThrough()

    comp.ngOnInit()
    
    expect(gm).toHaveBeenCalled();
  })

  it('should call calcDecade on durationEvt event dispatched at DecadeComponent', fakeAsync(() => {
    spyOn(comp, 'calcDecade');

    const dc = de.query(By.directive(DecadeComponent));
    const dcmp = dc.componentInstance;
    const evt = [ {
      "Title":"Batman & Robin",
      "Year":"1997",
      "imdbID":"tt0118688",
      "Type":"movie",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
   },]

    dcmp.durationEvt.emit(evt);

    tick(10)
    fixture.detectChanges();

    expect(comp.calcDecade).toHaveBeenCalledWith(evt);
  }))

  it('should call calcDecade and set filteredMovies', ()=>{
    const evt = [ {
      "Title":"Batman & Robin",
      "Year":"1997",
      "imdbID":"tt0118688",
      "Type":"movie",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
   },]

    comp.calcDecade(evt);

    expect(comp.filteredMovies).toEqual(evt)
  })

  it('should call clearFilters on clearEvt event at DecadeComponent', fakeAsync(() => { 
    spyOn(comp, 'clearFilters');

    const dc = de.query(By.directive(DecadeComponent));
    const dcmp = dc.componentInstance;
    
    dcmp.clearEvt.emit();
    tick(10);
    fixture.detectChanges();

    expect(comp.clearFilters).toHaveBeenCalled()
  }));

});

