import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  JSON = JSON;
  pageId = 1;
  tableConfig = {
    "pageId" : null,
    "ps": 10,
    "pn": 1,
    "search": [] 
  };

  rowSelected(row) {
    console.log(row)
  }
  filterUpdate(filterData) {
    this.tableConfig.search = filterData;
    this.tableConfig.pageId = this.pageId;
  }
}
