import { InjectionToken } from '@angular/core';

export const CS_TABLE_TOKEN = new InjectionToken('CS_TABLE_TOKEN');
  export interface CsTableConfig {
    components: Object;
    // pageId: string;
    apiBase: string;
  }