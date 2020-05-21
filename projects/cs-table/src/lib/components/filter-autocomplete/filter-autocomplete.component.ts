import { Component, OnInit, EventEmitter, Output, Input, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CsTableConfig } from '../../configs/config';
import { CS_TABLE_TOKEN } from '../../configs/config';

@Component({
  selector: 'filter-autocomplete',
  templateUrl: './filter-autocomplete.component.html',
  styleUrls: ['./filter-autocomplete.component.css']
})
export class FilterAutocompleteComponent implements OnInit {
  public filterSelected: any;
  public apiBase: string;// = 'http://localhost:8081';
  public options: Array<any> = [];
  public value: any = '';
  public _data: any;    
  public autoCompleteUpdate = new Subject<string>();
  public autoCompleteNgModel: string = '';
  public _filteredData: any;
  public items: Array<any> = [];
  public apiInProgress: boolean = false;
  public errorMessage: string = '';
  @Input() 
  set data(d:any) {
    this._data = d;    
    this.autoCompleteNgModel = this._data.filterSelected ? this._data.filterSelected : '';
    if(this.autoCompleteNgModel.trim() !== '') {
      this.filterSelected = {[this._data.key]: this.autoCompleteNgModel};
    }

  }
  @Input() pageId: any;
  @Output() onSubmitFilter: EventEmitter<Object> = new EventEmitter();
  @Output() onCancelFilter: EventEmitter<Object> = new EventEmitter();

  
  
  constructor(
    private http: HttpClient,    
    @Inject(CS_TABLE_TOKEN) private csTableConfig: CsTableConfig
    ) { 
      this.apiBase = this.csTableConfig.apiBase;
    }

  
  ngOnInit() {
    this.autoCompleteUpdate.pipe(
      debounceTime(2000),
      distinctUntilChanged(), 
      switchMap(value => {        
        this.apiInProgress = true;       
        return this.http.post(`${this.apiBase}/filters/${this.pageId}`, {key: this._data.key, search: value  })      
        // return this.http.get(`${this.apiBase}/filters/${this.pageId}`) 
      })        
    )
    .subscribe(resp => {     
        this.items = resp['data'];
        this.apiInProgress = false;
      })
  }
  
  selectItem(item: Object) {
    this.filterSelected = item;    
    this.autoCompleteNgModel = item[this._data.key];
    this.items = [];
  }
  go() {
    this.errorMessage = '';
    if(this.filterSelected && this.filterSelected[this._data.key].trim() !== '') {
      this.onSubmitFilter.emit({data:this._data, value:this.filterSelected[this._data.key]});
    } else {
      this.errorMessage = 'Select an option'
    }

  }
  cancel() {
    this.onCancelFilter.emit({data:this._data, value:''});
    this.errorMessage = ''; 
  }
}
