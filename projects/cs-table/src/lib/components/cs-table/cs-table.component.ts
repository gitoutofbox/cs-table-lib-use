import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, Inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CS_TABLE_TOKEN } from '../../configs/config';
import { CsTableConfig } from '../../configs/config';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface TableConfig {
  "pageId": any;
  "ps"?: number;
  "pn"?: number;
  "search"?: null | Array<any>
}
@Component({
  selector: 'cs-table',
  templateUrl: './cs-table.component.html',
  styleUrls: ['./cs-table.component.css']
})
export class CsTableComponent implements OnInit {
  public components;
  private apiBase: string;
  public pageId: string;
  private tableConfig: TableConfig;
  @Input() config: string;
  @Output() onCheck: EventEmitter<any> = new EventEmitter<any>();
  public columns: Array<any> = [];
  public tableData: Array<any> = [];

  constructor(
    private http: HttpClient,
    @Inject(CS_TABLE_TOKEN) private csTableConfig: CsTableConfig
  ) {
    this.components = this.csTableConfig.components;
    // this.pageId       = this.csTableConfig.pageId;
    this.apiBase = this.csTableConfig.apiBase;
  }
  ngOnChanges(changes: SimpleChanges) {
    //!changes.config.firstChange
    // &&  changes.config.previousValue !== changes.config.currentValue

    if (changes.config) {
      this.parseConfigurations();
      if (!this.columns.length) {
        this.getColumns().subscribe(resp => {
          if (resp['data'] && resp['data']['columns'].length) {
            this.columns = resp['data'].columns;
            this.loadTableData();
          }
        })
      } else {
        this.loadTableData();
      }
    }
  }
  ngOnInit(): void {
    // this.get();
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
      "search": this.tableConfig.search ? this.tableConfig.search : ''
    }
    const url = `${this.apiBase}/table/${this.pageId}`;
    this.http.post(url, postData).subscribe(resp => {
      const rows = resp['data']['rows'];
      this.tableData = rows;
    })
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

}
