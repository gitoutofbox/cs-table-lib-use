import { Component, Input, SimpleChanges, Output, EventEmitter, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CsTableConfig, CS_TABLE_TOKEN, Pagination } from '../../configs/config';
import { Observable, of } from 'rxjs';
import { CsTableService } from '../../services/cs-table.service';

interface TableConfig {
  "pageId": any;
  "ps"?: number;
  "pn"?: number;
  "search"?: null | Array<any>;
}
@Component({
  selector: 'cs-table',
  templateUrl: './cs-table.component.html',
  styleUrls: ['./cs-table.component.css']
})
export class CsTableComponent {
  public components;
  private apiBase: string;
  public pageId: string;
  public tableConfig: TableConfig;
  @Input() config: string;
  @Output() onCheck: EventEmitter<any> = new EventEmitter<any>();
  public columns: Array<any> = [];
  public tableData: Array<any> = [];
  public totalRecords: number = 0;

  public pagination: Pagination = {
    enable: true,
    boundaryLinks: true,
    maxSize: 5,
    previous: 'Prev',
    next: 'Next',
    first: 'First',
    last: 'Last'
  }
  public sortBy: string = '';
  public sortType: string = '';

  constructor(
    private http: HttpClient,
    private csTableService: CsTableService,
    @Inject(CS_TABLE_TOKEN) private csTableConfig: CsTableConfig
  ) {
    // console.log(this.csTableConfig)
    this.components = this.csTableConfig.components;
    this.apiBase = this.csTableConfig.apiBase;
    if (this.csTableConfig.pagination) {
      if (typeof this.csTableConfig?.pagination.enable !== 'undefined') {
        this.pagination.enable = this.csTableConfig.pagination.enable
      }
      if (typeof this.csTableConfig?.pagination.boundaryLinks !== 'undefined') {
        this.pagination.boundaryLinks = this.csTableConfig.pagination.boundaryLinks
      }
      if (typeof this.csTableConfig?.pagination.maxSize !== 'undefined') {
        this.pagination.maxSize = this.csTableConfig.pagination.maxSize
      }
      if (typeof this.csTableConfig?.pagination.previous !== 'undefined') {
        this.pagination.previous = this.csTableConfig.pagination.previous
      }
      if (typeof this.csTableConfig?.pagination.next !== 'undefined') {
        this.pagination.next = this.csTableConfig.pagination.next
      }
      if (typeof this.csTableConfig?.pagination.last !== 'undefined') {
        this.pagination.last = this.csTableConfig.pagination.last
      }
      if (typeof this.csTableConfig?.pagination.first !== 'undefined') {
        this.pagination.first = this.csTableConfig.pagination.first
      }
    }

    this.csTableService.export().subscribe(resp => {
      if (resp['type'] === 'csv') {
        this.exportFile('csv');
      }
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.config) {
      this.parseConfigurations();
      if (!this.columns.length) {
        this.getColumns().subscribe(resp => {
          if (resp['data'] && resp['data']['columns'].length) {
            this.columns = resp['data'].columns;
            for (let i = 0; i < this.columns.length; i++) {
              if (this.columns[i]['sorting_enable'] && this.columns[i]['sorted']) {
                this.sortBy = this.columns[i]['key'];
                this.sortType = this.columns[i]['sort_type'];
              }
            }
            this.loadTableData();
          }
        })
      } else {
        this.loadTableData();
      }
    }
  }

  parseConfigurations() {
    this.tableConfig = JSON.parse(this.config);
    this.pageId = this.tableConfig.pageId;
  }

  getColumns(): Observable<any> {
    if (this.pageId && this.pageId !== 'undefined' && this.pageId !== '' && this.apiBase !== '') {
      const url = `${this.apiBase}/table/${this.pageId}`;
      return this.http.get(url);
    } else {
      return of({})
    }
  }
  loadTableData() {
    const postData = {
      "ps": this.tableConfig.ps ? this.tableConfig.ps : 10,
      "pn": this.tableConfig.pn ? this.tableConfig.pn : 1,
      "search": this.tableConfig.search ? this.tableConfig.search : '',
      "sort": { sortBy: this.sortBy, sortType: this.sortType }
    }
    const url = `${this.apiBase}/table/${this.pageId}`;
    this.http.post(url, postData).subscribe(resp => {
      const rows = resp['data']['rows'];
      this.totalRecords = resp['data']['totalRows'];
      this.tableData = rows;
    })
  }
  doSort(col) {
    if (col.sorting_enable) {
      this.sortBy = col.key;
      this.sortType = this.sortType == 'asc' ? 'desc' : 'asc';
      this.loadTableData();
    }
  }
  pageChanged(data) {
    this.tableConfig.pn = data.page;
    this.loadTableData();
  }
  checkSingle(row) {
    row.selected = !row.selected;
    this.onCheck.emit({ type: 'single', selected: row, all: this.tableData })
  }
  checkAll(e: any) {
    const checked = e.currentTarget.checked ? true : false;
    for (let row of this.tableData) {
      row.selected = checked;
    }
    this.onCheck.emit({ type: 'all', selected: {}, all: this.tableData })
  }


  exportFile(fileType:string) {
    const postData = {
      "ps": this.tableConfig.ps ? this.tableConfig.ps : 10,
      "pn": this.tableConfig.pn ? this.tableConfig.pn : 1,
      "search": this.tableConfig.search ? this.tableConfig.search : '',
      "sort": { sortBy: this.sortBy, sortType: this.sortType }
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', undefined);
    headers.append('responseType', 'blob');

    const url = `${this.apiBase}/export/${this.pageId}`;
    this.http.post(url, postData, { responseType: 'blob' }).subscribe(resp => {
      if(fileType === 'csv') {
        this.downLoadFile(resp, "data:text/csv;charset=utf-8")
      }      
    })
  }
  downLoadFile(data: any, type: string) {
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob([data], { type: type }));
    downloadLink.setAttribute('download', 'export.csv');
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
