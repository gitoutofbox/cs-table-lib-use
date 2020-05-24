import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CsTableComponent } from './components/cs-table/cs-table.component';
import { ComponentLoaderComponent } from './components/component-loader/component-loader.component';
import { DatePipe } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';


import {CS_TABLE_TOKEN} from './configs/config';
import {CsTableConfig} from './configs/config';

import { CsTableFilterComponent } from './components/cs-table-filter/cs-table-filter.component';
import { FilterDropdownComponent } from './components/filter-dropdown/filter-dropdown.component';
import { FilterAutocompleteComponent } from './components/filter-autocomplete/filter-autocomplete.component';
import { FilterDateComponent } from './components/filter-date/filter-date.component';
import { FilterNumberComponent } from './components/filter-number/filter-number.component';

@NgModule({
  declarations: [
    CsTableComponent, 
    ComponentLoaderComponent, 
    CsTableFilterComponent, 
    FilterDropdownComponent,  
    FilterAutocompleteComponent, FilterDateComponent, FilterNumberComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [DatePipe],
  exports: [
    CsTableComponent, 
    ComponentLoaderComponent, 
    CsTableFilterComponent, 
    FilterDropdownComponent,  
    FilterAutocompleteComponent
  ]
})
export class CsTableModule { 
  
  static forRoot(csTableConfig: CsTableConfig): ModuleWithProviders {
    return {
      ngModule: CsTableModule,
      providers: [
        {
          provide: CS_TABLE_TOKEN,
          useValue: csTableConfig
        }
      ]
    };
  }
  
}
