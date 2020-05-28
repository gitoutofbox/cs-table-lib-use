import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsTableService {
  private exportSubject = new Subject();
  
  constructor() { }

  export() {
    return this.exportSubject.asObservable();
  }
  triggerExport() {
    this.exportSubject.next({type: 'csv'})
  }


}
