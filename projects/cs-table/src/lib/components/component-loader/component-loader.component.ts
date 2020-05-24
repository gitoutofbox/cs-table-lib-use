import { Component,ViewContainerRef,  Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
@Component({
  selector: 'app-component-loader',
  templateUrl: './component-loader.component.html',
  styleUrls: ['./component-loader.component.css']
})
export class ComponentLoaderComponent  {
  @Input() component: any;
  @Input() data: any;
  @Input() availableComponents: any;
  @ViewChild('componentHost', {static: true, read: ViewContainerRef} as any) componentHost: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngAfterViewInit() {
    this.loadComponent();
  }
  // ngOnInit() {
  //   // this.components = [];//this.componentLoaderService.getComponent();
  // }


  
  loadComponent() {
    if(typeof this.componentHost !== 'undefined'){      
      // for(const component of this.component) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.availableComponents[this.component]);
        const componentRef = this.componentHost.createComponent(componentFactory);
        //setTimeout(()=> {
          (<any>componentRef.instance).data = this.data;
        //},10);
      // }
    }
  }
}
