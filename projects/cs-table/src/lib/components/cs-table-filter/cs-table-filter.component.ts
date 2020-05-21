import { Component, OnInit, EventEmitter, ComponentFactoryResolver, ViewChild, ViewContainerRef, HostListener, Output, ElementRef, Inject, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FilterDropdownComponent } from '../filter-dropdown/filter-dropdown.component';
import { FilterTextComponent } from '../filter-text/filter-text.component';
import { FilterAutocompleteComponent } from '../filter-autocomplete/filter-autocomplete.component';
import { FilterDateComponent } from '../filter-date/filter-date.component';


import { CS_TABLE_TOKEN } from '../../configs/config';
import { CsTableConfig } from '../../configs/config';
import { DatePipe } from '@angular/common';

interface Filter {
  key: string;
  filterLabel: string;
  filterType: string;
  filterSelected: string;
}
@Component({
  selector: 'cs-table-filter',
  templateUrl: './cs-table-filter.component.html',
  styleUrls: ['./cs-table-filter.component.css']
})
export class CsTableFilterComponent implements OnInit {
  public filters: Array<Filter> = [];

  // public pageId: string = '1';
  // public apiBase: string = 'http://localhost:8081';

  private apiBase: string;
  // public pageId: string;

  public filterOpened: boolean = false;
  public showSingleFilter: boolean = false;

  public position = {top:0, left:0};
  private componentRef;
  private componentMapping: Object = {
    dropdown: FilterDropdownComponent,
    text: FilterTextComponent,
    autocomplete: FilterAutocompleteComponent,
    date: FilterDateComponent
  };
  private searchArr = [];
  @Input() pageId : string | number;
  @Output() onFilterUpdate: EventEmitter<any> = new EventEmitter();
  @ViewChild('componentHost', { static: true, read: ViewContainerRef } as any) componentHost: ViewContainerRef;
  constructor(private http: HttpClient, private componentFactoryResolver: ComponentFactoryResolver, @Inject(CS_TABLE_TOKEN) private csTableConfig: CsTableConfig, private datePipe: DatePipe) {
    this.apiBase = this.csTableConfig.apiBase;
  }
  
  @HostListener('document:click')
  clickout() {
    this.filterOpened && this.close();
  }
  ngOnInit(): void {
    this.loadFilters();
  }
  loadFilters() {
    const url = `${this.apiBase}/filters/${this.pageId}`;
    this.http.get(url).subscribe(resp => {
      this.filters = resp['data'];

      const selectedFilters = this.filters.filter(item => item.filterSelected !== '');
      for (let i = 0; i < selectedFilters.length; i++) {
        this.filterSubmitted({ data: selectedFilters[i], value: selectedFilters[i].filterSelected }, false);
      }
      this.onFilterUpdate.emit(this.searchArr);

    })
  }
  getSelectedFilters(filters) {
    return filters.filter(item => item.filterSelected !== '');
  }
  getNotSelectedFilters(filters) {
    return filters.filter(item => item.filterSelected === '')
  }
  positionFilter(ref) {
    let elem;
    if (ref.target.tagName === 'SPAN') {
      elem = ref.target.parentElement;
    } else {
      elem = ref.target;
    }
    const position = elem.getBoundingClientRect();
    this.position = { top: elem.offsetTop, left: elem.offsetLeft }
  }
  addFilter(filter) {
    // if(this.filterOpened) {
    //   return false;
    // }
    this.filters.map(item => {
      if (item.key === filter.key)
        item['filterSelected'] = filter.filterSelected;
    })

    this.showSingleFilter = true;
    const componentToLoad = this.componentMapping[filter['filterType']];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToLoad);
    this.componentRef = this.componentHost.createComponent(componentFactory);

    (<any>this.componentRef.instance).data = filter;
    (<any>this.componentRef.instance).pageId = this.pageId;
    (<any>this.componentRef.instance).onSubmitFilter.subscribe(data => { this.filterSubmitted(data); });
    (<any>this.componentRef.instance).onCancelFilter.subscribe(data => { this.filterCancelled(data); });
  }
  removeFilter(e, filter) {
    e.stopPropagation();
    this.filterCancelled(filter)
  }
  filterSubmitted(outputData, doEmit: boolean = true) {
    // console.log('outputData', outputData)
    const key = outputData.data.key;
    const filterType = outputData.data.filterType;
    const value = outputData.value;
    const inType = ['typeahead', 'multiselect'];
    const betweenType = ['date', 'number'];
    this.searchArr = this.searchArr.filter(item => item.search !== key)
    this.searchArr = this.searchArr.filter(item => item.value !== '')

    this.filters.map(item => {
      if (item.key === key) {
        item['filterSelected'] = '';
      }
    })

    let valueArr;
    this.searchArr.push({ search: key, value: value });
      this.filters.map(item => {
        if (item.key === key) {
          item['filterSelected'] = value;

          if(betweenType.indexOf(filterType) !== -1) {
            valueArr = value.split('BETWEEN|');
            valueArr = valueArr[1];
            valueArr = valueArr.split(",");
            const from = this.datePipe.transform(new Date(valueArr[0]),'MMM d, y');
            const to = this.datePipe.transform(new Date(valueArr[1]),'MMM d, y');
            item['filterSelectedDisplay'] = `${from}-${to}`;
          } else {
            item['filterSelectedDisplay'] = value;
          }          
        }
      })


    // if (inType.indexOf(filterType) !== -1 && value != '') {
    //   this.searchArr.push({ search: key, value: `in|${value}` })
    //   this.filters.map(item => {
    //     if (item.key === key)
    //       item['filterSelected'] = `in|${value}`;
    //   })
    // } else if (betweenType.indexOf(filterType) !== -1 && value != '') {
    //   this.searchArr.push({ search: key, value: `between|${value}` })
    //   this.filters.map(item => {
    //     if (item.key === key)
    //       item['filterSelected'] = `between|${value}`;
    //   })
    // } else if (value !== '') {
    //   this.searchArr.push({ search: key, value: value });
    //   this.filters.map(item => {
    //     if (item.key === key) {
    //       item['filterSelected'] = value;
    //     }
    //   })
    // }


    if (doEmit) { this.onFilterUpdate.emit(this.searchArr); }
    this.close();
  }

  filterCancelled(outputData: any) {
    this.searchArr = this.searchArr.filter(item => item.search !== outputData.key)
    this.searchArr = this.searchArr.filter(item => item.value !== '')
    console.log('this.filters', this.filters)
    console.log('this.outputData', outputData)
    this.filters.map(item => {
      if (item.key === outputData.key) {
        item['filterSelected'] = '';
      }
    })
    this.onFilterUpdate.emit(this.searchArr);
    this.showSingleFilter = false;
    this.componentRef && this.componentRef.destroy()
  }
  close() {
    if (typeof this.componentRef !== 'undefined') { this.componentRef.destroy() }
    this.filterOpened = false;
    this.showSingleFilter = false;
  }
}
