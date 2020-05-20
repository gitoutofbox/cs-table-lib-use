import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAutocompleteComponent } from './filter-autocomplete.component';

describe('AutocompleteComponent', () => {
  let component: FilterAutocompleteComponent;
  let fixture: ComponentFixture<FilterAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
