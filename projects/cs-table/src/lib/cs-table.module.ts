import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CsTableComponent } from './components/cs-table/cs-table.component';
import { ComponentLoaderComponent } from './components/component-loader/component-loader.component';

import { CsTableFilterComponent } from './components/cs-table-filter/cs-table-filter.component';
import { FilterDropdownComponent } from './components/filter-dropdown/filter-dropdown.component';
import { FilterTextComponent } from './components/filter-text/filter-text.component';
import { FilterAutocompleteComponent } from './components/filter-autocomplete/filter-autocomplete.component';
// require('src/lib/css/style.css')
import {CS_TABLE_TOKEN} from './configs/config';
import {CsTableConfig} from './configs/config';

@NgModule({
  declarations: [
    CsTableComponent, 
    ComponentLoaderComponent, 
    CsTableFilterComponent, 
    FilterDropdownComponent, 
    FilterTextComponent, 
    FilterAutocompleteComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    CsTableComponent, 
    ComponentLoaderComponent, 
    CsTableFilterComponent, 
    FilterDropdownComponent, 
    FilterTextComponent, 
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
