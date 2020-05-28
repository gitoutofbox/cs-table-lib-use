//npm i msexcel-builder--save
exports.export = (req, res) => {
    let headers = [];
    let data = [];
    let contains = '';
    namespace.getColumns(req).then(colResp => {
        
        for(let i=0; i<colResp.columns.length; i++) {
            headers.push(colResp.columns[i]['label'])
        }
        contains = headers.join(",") + '\n';

        namespace.getData(req).then(dataResp => {
            for(let i=0; i<dataResp.rows.length; i++) {
                data = [];
                for(let j=0; j<colResp.columns.length; j++) {
                    data.push(dataResp.rows[i][colResp.columns[j]['key']]);
                }
                contains = contains + data.join(",") + '\n';
            }          
            res.send(contains)
        });
    });
}

namespace = {
    getColumns: (req) => {
        return new Promise((resolve, reject) => {
            let where = ` WHERE page_id = "${req.params.page_id}"`;
            const sql = `SELECT * FROM arc_tables ${where}`;
            database.query(sql, (err, rows) => {
                if (err) { reject(err); return; }
                resolve({
                        "columns": JSON.parse(rows[0]['columns'])
                    });
            });
        });
    },
    getData: (req) => {
        console.log('req', req.body)
        return new Promise((resolve, reject) => {
            const page_id = req.params.page_id;
            let sql = `SELECT table_name FROM  arc_table_page WHERE page_id = "${page_id}"`;
            database.query(sql, (err, tableNameRow) => {
                if (err) { reject(err); return ;}

                const search = req.body.search;
                const sort = req.body.sort;
                console.log('search', search)
                const WHERE = namespace.createFilters(search);
                const ORDER_BY = namespace.createOrderBy(sort);
                sql = `SELECT * FROM ${tableNameRow[0]['table_name']}  ${WHERE} ${ORDER_BY}`;
                // console.log(sql)
                database.query(sql, (err, rows) => {
                    if (err) { reject(err); return ;}
                    resolve({"rows": rows});                    
                });
            })
        })
    },
    createFilters: (search) => {
        console.log('search', search)
        let valueArr;
        let where = ' WHERE 1= 1 ';
        for (let item of search) {
            valueArr = item.value;
            valueArr = valueArr.split("|");
            if (valueArr.length > 1) {
                switch ((valueArr[0]).toLowerCase()) {
                    case 'between':
                        let valueItems = valueArr[1].split(",");
                        where = `${where} AND ${item.search} BETWEEN "${valueItems[0]}" AND "${valueItems[1]}"`;
                        break;
                }
            } else {
                where = `${where} AND ${item.search} = "${item.value}"`;
            }
        }
        // console.log(where)
        return where;
    },
    createOrderBy: (sort) => {
        let orderBy = ' ';
        if (sort && sort.sortBy && (sort.sortBy).trim() !== '') {
            orderBy = `ORDER BY ${sort.sortBy} `;

            if (sort.sortType && (sort.sortType).trim() !== '') {
                orderBy = `${orderBy} ${sort.sortType}`;
            }
        }
        return orderBy;
    }
}