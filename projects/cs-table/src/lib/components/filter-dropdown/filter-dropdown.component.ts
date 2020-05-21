import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CsTableConfig } from '../../configs/config';
import { CS_TABLE_TOKEN } from '../../configs/config';

@Component({
  selector: 'app-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css']
})
export class FilterDropdownComponent implements OnInit {
  @Input() data: any;
  @Input() pageId: any;
  
  public apiBase: string;// = 'http://localhost:8081';
  public options: Array<any> = [];
  @Output() onSubmitFilter: EventEmitter<Object> = new EventEmitter();
  @Output() onCancelFilter: EventEmitter<Object> = new EventEmitter();
  public filterSelected: any = '';
  public errorMessage: string = '';
  constructor(
    private http: HttpClient,    
    @Inject(CS_TABLE_TOKEN) private csTableConfig: CsTableConfig
    ) { 
      this.apiBase = this.csTableConfig.apiBase;
    }

  ngOnInit(): void {
    this.loadOptions();
  }
  loadOptions() {
    this.http.post(`${this.apiBase}/filters/${this.pageId}`, {key: this.data.key}).subscribe(resp => {
      this.options = resp['data'];
      this.filterSelected = this.data.filterSelected ? this.data.filterSelected : '';
      // console.log(this.filterSelected);
    })
  }
  go() {
    this.errorMessage = '';
    if(this.filterSelected.trim() !== '') {
      this.onSubmitFilter.emit({data:this.data, value:this.filterSelected});
    } else {
      this.errorMessage = 'Select an option'
    }

    
  }
  cancel() {
    this.onCancelFilter.emit({data:this.data, value:''});
    this.errorMessage = ''; 
    // this.onSubmitFilter.emit({data:this.data, value:''});
  }
}
