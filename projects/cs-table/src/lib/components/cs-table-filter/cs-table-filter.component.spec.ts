import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsTableFilterComponent } from './cs-table-filter.component';

describe('CsTableFilterComponent', () => {
  let component: CsTableFilterComponent;
  let fixture: ComponentFixture<CsTableFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsTableFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
