import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.css']
})
export class FilterDateComponent implements OnInit {
  @Input() data: any;
  @Input() pageId: any;
  @Output() onSubmitFilter: EventEmitter<Object> = new EventEmitter();
  @Output() onCancelFilter: EventEmitter<Object> = new EventEmitter();
  public errorMessage: string = '';
  public filterSelected: Array<any> = [];
  private selectedDate: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
    console.log(this.data.filterSelected);
    let filterSelectedTemp;
    if(this.data.filterSelected && this.data.filterSelected !== '') {
      
      filterSelectedTemp = (this.data.filterSelected).split('BETWEEN|');
      filterSelectedTemp = (filterSelectedTemp[1]).split(",")
      // console.log('filterSelectedTemp', filterSelectedTemp)
      this.filterSelected = [new Date(filterSelectedTemp[0]), new Date(filterSelectedTemp[1])];
      }
  }
  onValueChange(data) {
    let [start, end] = [...data]
    // start = new Date(start).setHours(0,0,0)
    // end = new Date(end).setHours(0,0,0);
    let d, m, y;
    d = new Date(start).getDate();
    d =  d<10? '0'+d:''+d;

    m = new Date(start).getMonth() + 1;
    m =  m<10? '0'+m:''+m;

    y = new Date(start).getFullYear();
    start = `${y}-${m}-${d} 00:00:00`;

    d = new Date(end).getDate();
    d =  d<10? '0'+d:''+d;

    m = new Date(end).getMonth() + 1;
    m =  m<10? '0'+m:''+m;

    y = new Date(end).getFullYear();
    end = `${y}-${m}-${d} 23:59:59`;

    this.selectedDate = [start, end];
  }
  go() {
    console.log('filterSelected', this.selectedDate)
    this.errorMessage = '';
    this.onSubmitFilter.emit({data:this.data, value: `BETWEEN|${this.selectedDate}`});
  }
  cancel() {
    this.onCancelFilter.emit({data:this.data, value:''});
    this.errorMessage = '';     
  }
}
