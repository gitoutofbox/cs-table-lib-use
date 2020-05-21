# CsTable

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Code scaffolding

Run `ng generate component component-name --project cs-table` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project cs-table`.
> Note: Don't forget to add `--project cs-table` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build cs-table` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build cs-table`, go to the dist folder `cd dist/cs-table` and run `npm publish`.

## Running unit tests

Run `ng test cs-table` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Usage
Steps:
1. npm i cs-table
2. In your module:
    import { CsTableModule } from 'cs-table';

    create a service file that will return all the component referent to be added dynamically:
    in module:
    import { ComponentLoaderService } from './shared/services/component-loader.service';


    in decorator imports section add following:

    CsTableModule.forRoot({
      components: ComponentLoaderService.getComponent,
      apiBase: 'http://localhost:8081'
    })
    "apiBase" is your base api url to append "/filters/pageId" & "/tables/pageId"

3. In component file:
    //Add table configurations
    export class AppComponent {
    JSON = JSON;
    pageId = 1;
    tableConfig = {
        "pageId" : null,
        "ps": 10,
        "pn": 1,
        "search": [] 
    };
    //Output to be called when ever the default-checkbox(of table) is clicked 
    rowSelected(row) {
        console.log(row)
    }
    //After getting already-saved-filters set pageId
    filterUpdate(filterData) {
        this.tableConfig.search = filterData;
        this.tableConfig.pageId = this.pageId;
    }
    }

4. To test run the server using : node server.js
    server files are here: https://github.com/gitoutofbox/cs-table-lib-use/tree/master/csTable-server

5. set databse, create DB & table:
    here is the (mysql) file: https://github.com/gitoutofbox/cs-table-lib-use/blob/master/angular_architecture.sql

6. Add css: open your angular.json file or index file and add follwing css:
    "node_modules/cs-table/css/style.css"
    
7. For reference check:  https://github.com/gitoutofbox/cs-table-lib-use/tree/master/projects/lib-test/src