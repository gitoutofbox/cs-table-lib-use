import { Component,ViewContainerRef,  Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
@Component({
  selector: 'app-component-loader',
  templateUrl: './component-loader.component.html',
  styleUrls: ['./component-loader.component.css']
})
export class ComponentLoaderComponent  {
  @Input() component: any;
  @Input() data: any;
  @Input() key: string;
  @Input() availableComponents: any;
  @ViewChild('componentHost', {static: true, read: ViewContainerRef} as any) componentHost: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngAfterViewInit() {
    // this.loadComponent();
    Promise.resolve(null).then(() => this.loadComponent());
  }

  
  loadComponent() {
    if(typeof this.componentHost !== 'undefined'){      
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.availableComponents[this.component]);
        this.componentHost.clear();
        const componentRef = this.componentHost.createComponent(componentFactory);
        //setTimeout(()=> {
          (<any>componentRef.instance).data = this.data;
          (<any>componentRef.instance).key = this.key;
          // if(typeof (<any>componentRef.instance).dataSetDone !== 'undefined') {
          //   (<any>componentRef.instance).dataSetDone();
          // }

        //},10);

    }
  }
}
