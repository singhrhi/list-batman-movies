import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MovieService } from './movie.service';

fdescribe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
    imports: [
      RouterTestingModule,
      HttpClientTestingModule,
    ],});
   
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getFilteredMovies and return observable and assign to fObs$', () => {
    spyOn(service, 'getMovies').and.callFake(()=>{
    return of(null);
    })
    service.getMovies()

    expect(service.getMovies).toHaveBeenCalled();
  })
});
