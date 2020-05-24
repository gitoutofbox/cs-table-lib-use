# CsTable

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Usage
Reference: https://github.com/gitoutofbox/cs-table-lib-use/tree/master/projects/lib-test/src

Steps:
1. npm i cs-table
    For datepicker & pagination using: ngx-bootstrap, so you need to install it

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
    optionally give pagination congif(check ngx-bootstrap for pagination options):
    Like:
    CsTableModule.forRoot({
      components: ComponentLoaderService.getComponent,
      apiBase: 'http://localhost:8081',
      pagination: {
        enable: false // default is true
        boundaryLinks: false
        //othr properties
      }
    })

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

## API response structure:
1. GET filters: ex:  http://localhost:8081/filters/1
    response sample:
    {
    "status": "success",
    "data": [
        {
            "key": "user_email",
            "filterLabel": "Email",
            "filterType": "dropdown",
            "filterSelected": "admin@admin.com"
        },
        {
            "key": "user_first_name",
            "filterLabel": "First name",
            "filterType": "autocomplete",
            "filterSelected": ""
        },
        {
            "key": "user_total_follower",
            "filterLabel": "Follower",
            "filterType": "number",
            "filterSelected": "BETWEEN|10,100"
        },
        {
            "key": "created_on",
            "filterLabel": "Created On",
            "filterType": "date",
            "filterSelected": "BETWEEN|2020-01-02 00:00:00,2020-06-03 00:00:00"
        }
    ]
}
2. GET columns: http://localhost:8081/table/1
    response:
    {
    "status": "success",
    "data": {
        "columns": [
            {
                "key": "user_id",
                "label": "User Id",
                "width": "10%",
                "sortingEnable": false,
                "type": "sp_checkbox",
                "filter_enable": false,
                "filter_label": "User Id",
                "filter_type": ""
            },
            {
                "key": "user_email",
                "label": "Email",
                "width": "25%",
                "sortingEnable": true,
                "type": "text",
                "filter_enable": true,
                "filter_label": "Email",
                "filter_type": "dropdown",
                "filter_selected": "admin@admin.com"
            },
            {
                "key": "user_first_name",
                "label": "First Name",
                "width": "20%",
                "sortingEnable": true,
                "type": "text",
                "filter_enable": true,
                "filter_label": "First name",
                "filter_type": "autocomplete",
                "filter_selected": ""
            },
            {
                "key": "user_total_follower",
                "label": "Followers",
                "width": "20%",
                "sortingEnable": true,
                "type": "text",
                "filter_enable": true,
                "filter_label": "Follower",
                "filter_type": "number",
                "filter_selected": "BETWEEN|10,100"
            },
            {
                "key": "created_on",
                "label": "Added On",
                "width": "15%",
                "sortingEnable": true,
                "type": "text",
                "filter_enable": true,
                "filter_label": "Created On",
                "filter_type": "date",
                "filter_selected": "BETWEEN|2020-01-02 00:00:00,2020-06-03 00:00:00"
            },
            {
                "key": "action",
                "label": "Action",
                "width": "10%",
                "sortingEnable": false,
                "type": "component",
                "components": [
                    "ActionEditComponent",
                    "ActionDeleteComponent"
                ],
                "filter_enable": false,
                "filter_label": "",
                "filter_type": "text"
            }
        ]
    }
}
3. POST, (get data by applied search): http://localhost:8081/table/1
Response:
{
    "status": "success",
    "data": {
        "rows": [
            {
                "user_id": 80,
                "user_email": "sda@sdf.sdf",
                "user_password": "xvvxcx",
                "user_first_name": "fname",
                "user_last_name": "lname",
                "user_photo": "v5.jpg",
                "user_total_follower": 40,
                "is_active": 1,
                "created_on": "2020-02-22T02:35:59.000Z",
                "updated_on": "0000-00-00 00:00:00"
            }
        ],
        "totalRows": 100
    }
}