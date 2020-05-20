import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-text',
  templateUrl: './filter-text.component.html',
  styleUrls: ['./filter-text.component.css']
})
export class FilterTextComponent implements OnInit {
  @Input() data: any;
  public value: any = '';
  constructor() { }

  ngOnInit(): void {   
  }
}
