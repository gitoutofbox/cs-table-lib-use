import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-action-edit',
  templateUrl: './action-edit.component.html',
  styleUrls: ['./action-edit.component.css']
})
export class ActionEditComponent implements OnInit {
  @Input() data: Object;
  constructor() { }

  ngOnInit(): void {
  }
  edit() {
    console.log(this.data)
  }

}
