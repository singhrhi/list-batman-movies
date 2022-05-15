import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DecadeComponent } from './decade.component';

fdescribe('DecadeComponent', () => {
  let fixture:any, component:any, dcomp:any, element:any, de:any, ms:any, testBedMovieService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecadeComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should populate properties with default values in ngOnInint`, async() => {
    component.ngOnInit()
    expect(component.isFiltered).toEqual({t: false, n: false})
    expect(component.twentees).toEqual([])
    expect(component.ninetees).toEqual([])
  })

  it(`should push value to ninetees and twentees accordingly after change in movies input property`, async() => {
    component.movies = [{
      "Title":"Batman Begins",
      "Year":"2005",
      "imdbID":"tt0372784",
      "Type":"movie",
      "Poster":"https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
    },{
      "Title":"Batman Forever",
      "Year":"1995",
      "imdbID":"tt0112462",
      "Type":"movie",
      "Poster":"https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
    },]
    fixture.detectChanges();

    expect(component.twentees.length).toEqual(1);
    expect(component.ninetees.length).toEqual(1);
  })

  it(`should push nothing to ninetees and twentees if no change in movies input property`, async() => {
    component.movies = []
    fixture.detectChanges();

    expect(component.twentees.length).toEqual(0);
    expect(component.ninetees.length).toEqual(0);
  })

  it(`should call clearFilters on click`, fakeAsync(() => {
    spyOn(component, 'clearFilters');

    component.isFiltered = {t: true, n: true};
    fixture.detectChanges();

    let btn = de.query(By.css('#an')).nativeElement;
    btn.dispatchEvent(new Event('click'));
    tick(10);
    
    expect(component.clearFilters).toHaveBeenCalled();
  }))

  it(`should call clearFilters, set isFiltered and emit event`, fakeAsync(() => {
    spyOn(component.clearEvt, 'emit');

    component.clearFilters();
    
    expect(component.clearEvt.emit).toHaveBeenCalled()
    expect(component.isFiltered).toEqual({t: false, n: false})
  }))

  it(`should call tDecade on click`, fakeAsync(() => {
    spyOn(component, 'tDecade');

    let btn = de.query(By.css('.btn-group #b1')).nativeElement;
    btn.click()
    tick();
    
    fixture.detectChanges();
    
    expect(component.tDecade).toHaveBeenCalled();    
  }))

  it(`should call tDecade and emit event`, fakeAsync(() => {
    spyOn(component.durationEvt, 'emit');
    component.twentees.length = 1;

    component.tDecade();
    
    expect(component.durationEvt.emit).toHaveBeenCalled()
    expect(component.isFiltered).toEqual({t: true, n: false})
  }))

  it(`should call tDecade and set isFiltered`, fakeAsync(() => {
    component.twentees.length = 0

    let run = component.tDecade();
    
    expect(component.isFiltered).toEqual({t: false, n: false})
    expect(run).toBe(undefined)
  }))

  it(`should call nDecade on click`, fakeAsync(() => {
    spyOn(component, 'nDecade');

    let btn = de.query(By.css('.btn-group #b2')).nativeElement;
    btn.click();
    tick();
    
    fixture.detectChanges();
    
    expect(component.nDecade).toHaveBeenCalled();    
  }))

  it(`should call nDecade and emit event`, fakeAsync(() => {
    spyOn(component.durationEvt, 'emit');
    component.ninetees.length = 1;

    component.nDecade();
    
    expect(component.durationEvt.emit).toHaveBeenCalled()
    expect(component.isFiltered).toEqual({t: false, n: true})
  }))

  it(`should call nDecade and set isFiltered`, fakeAsync(() => {
    component.ninetees.length = 0

    let run = component.nDecade();
    
    expect(component.isFiltered).toEqual({t: false, n: false})
    expect(run).toBe(undefined)
  }))

  it('should show clear filters', ()=>{
    component.isFiltered = {t: true, n:true}

    fixture.detectChanges();

    let el = de.query(By.css('div #an')).nativeElement;

    expect(el.innerHTML).toBe('clear filter');
  })

  it('should show b1 abd b2 buttons', ()=>{
    let el = de.query(By.css('#b1')).nativeElement;
    let el2 = de.query(By.css('#b2')).nativeElement;

    expect(el.innerHTML).toBe(`2000's`);
    expect(el2.innerHTML).toBe(`1999's`);
  })
  
});


