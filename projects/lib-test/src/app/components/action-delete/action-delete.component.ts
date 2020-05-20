import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-action-delete',
  templateUrl: './action-delete.component.html',
  styleUrls: ['./action-delete.component.css']
})
export class ActionDeleteComponent implements OnInit {
  @Input() data : Object;
  constructor() { }

  ngOnInit(): void {
  }
  delete() {
    console.log(this.data)
  }

}
