import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsTableComponent } from './cs-table.component';

describe('CsTableComponent', () => {
  let component: CsTableComponent;
  let fixture: ComponentFixture<CsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
