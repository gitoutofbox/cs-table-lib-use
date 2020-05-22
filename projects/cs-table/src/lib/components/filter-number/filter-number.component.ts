import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-filter-number',
  templateUrl: './filter-number.component.html',
  styleUrls: ['./filter-number.component.css']
})
export class FilterNumberComponent implements OnInit {
  @Input() data: any;
  @Input() pageId: any;
  @Output() onSubmitFilter: EventEmitter<Object> = new EventEmitter();
  @Output() onCancelFilter: EventEmitter<Object> = new EventEmitter();
  public errorMessage: string = '';
  // public filterSelected: Array<any> = [];
  public filterSelectedMin: number = null;
  public filterSelectedMax: number = null;
  private selectedDate: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
    let filterSelectedTemp;
    if(this.data.filterSelected && this.data.filterSelected !== '') {      
      filterSelectedTemp = (this.data.filterSelected).split('BETWEEN|');
      filterSelectedTemp = (filterSelectedTemp[1]).split(",")
      this.filterSelectedMin = +filterSelectedTemp[0];
      this.filterSelectedMax = +filterSelectedTemp[1];
      // this.filterSelected = [filterSelectedTemp[0], filterSelectedTemp[1]];
      }
  }
  go() {
    console.log('filterSelected', this.selectedDate)
    this.errorMessage = '';
    this.onSubmitFilter.emit({data:this.data, value: `BETWEEN|${this.filterSelectedMin}, ${this.filterSelectedMax}`});
  }
  cancel() {
    this.onCancelFilter.emit({data:this.data, value:''});
    this.errorMessage = '';     
  }

}
