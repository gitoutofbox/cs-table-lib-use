import { Injectable, InjectionToken } from '@angular/core';
import { ActionEditComponent } from './components/action-edit/action-edit.component';
import { ActionDeleteComponent } from './components/action-delete/action-delete.component';


@Injectable({ providedIn: 'root' })
export class ComponentLoaderService {
    constructor() { }
    public static getComponent =  {        
            'ActionEditComponent': ActionEditComponent,
            'ActionDeleteComponent': ActionDeleteComponent        
    }
}