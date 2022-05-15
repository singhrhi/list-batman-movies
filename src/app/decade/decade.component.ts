import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

import { details } from '../interfaces/movies'


@Component({
  selector: 'app-decade',
  templateUrl: './decade.component.html',
  styleUrls: ['./decade.component.scss']
})
export class DecadeComponent implements OnInit {

  @Output() durationEvt = new EventEmitter<details[]> ();

  @Output() clearEvt = new EventEmitter<any> ();

  ninetees: details[];

  twentees: details[];

  isFiltered: {t: boolean, n: boolean}

  constructor() { }

  ngOnInit(): void {
    this.isFiltered = {t: false, n: false};
    this.twentees = [];
    this.ninetees = [];
  }

  @Input()
  set movies(value: any) {
    if(value && value.length > 0) {
        value.forEach( (ele: details) => {

        if( (+ele['Year'] < 3000) && (+ele['Year'] >= 2000) ){
          this.twentees.push(ele);
        }

        if( (+ele['Year'] < 2000) && (+ele['Year'] >= 1900) ){
          this.ninetees.push(ele);
        }

      })
    }
  }
  
  nDecade(){
    if(!this.ninetees.length){
      this.isFiltered = {t: false, n: false};
      return;
    }
    this.durationEvt.emit([...this.ninetees])
    this.isFiltered = {t: false, n: true};
  }

  tDecade(){
    if(!this.twentees.length){
      this.isFiltered = {t: false, n: false};
      return;
    }
    this.durationEvt.emit([...this.twentees])
    this.isFiltered = {t: true, n: false};
  }

  clearFilters(){
    this.clearEvt.emit()
    this.isFiltered = {t: false, n: false};
  }

}
