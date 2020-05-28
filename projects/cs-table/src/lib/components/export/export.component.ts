import { Component, OnInit } from '@angular/core';
import { CsTableService } from '../../services/cs-table.service';

@Component({
  selector: 'cs-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor(private csTableService: CsTableService) { }

  ngOnInit(): void {
  }
  export() {
    this.csTableService.triggerExport();
  }
}
