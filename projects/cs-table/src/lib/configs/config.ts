import { InjectionToken } from '@angular/core';

export const CS_TABLE_TOKEN = new InjectionToken('CS_TABLE_TOKEN');
  export interface Pagination {
    enable?: boolean;
    boundaryLinks?: boolean;  
    maxSize?: number,
    previous?: string;
    next?: string;
    first?: string;
    last?: string;
  }

  export interface CsTableConfig {
    components: Object;
    apiBase: string;
    pagination?: Pagination;
  }