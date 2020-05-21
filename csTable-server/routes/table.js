exports.getColumns = (req, res) => {
    let where = ` WHERE page_id=${req.params.page_id}`;
    const sql = `SELECT * FROM arc_tables ${where}`;

    database.query(sql, (err, rows) => {
        if (err) { throw err; }
        res.send({
            "status": "success",
            data: {
                "columns": JSON.parse(rows[0]['columns'])
            }
        });

    });
}

exports.getData = (req, res) => {
    const page_id = req.params.page_id;

    let sql = `SELECT table_name FROM  arc_table_page WHERE page_id = ${page_id}`;
    database.query(sql, (err, tableNameRow) => {
        if (err) { throw err; }

        const pn = req.body.pn;
        const ps = req.body.ps;
        const search = req.body.search;
        const LIMIT = ` LIMIT ${(pn - 1) * ps}, ${ps}`;
        let where = namespace.createFilters(search);
        sql = `SELECT * FROM ${tableNameRow[0]['table_name']}  ${where} ${LIMIT}`;
        // console.log(sql)
        database.query(sql, (err, rows) => {
            if (err) { throw err; }
            res.send({
                "status": "success",
                data: {
                    "rows": rows,
                    "totalRows": 100
                }
            });
        });
    })

}

namespace = {
    createFilters: (search) => {
        let valueArr;
        let where = ' WHERE 1= 1 ';
       
        // console.log('search', search)

        for (let item of search) {  
            valueArr = item.value;
            valueArr = valueArr.split("|");
            if(valueArr.length > 1) {
                switch((valueArr[0]).toLowerCase()) {
                    case 'between':                        
                        let valueItems = valueArr[1].split(",");
                        where = `${where} AND ${item.search} BETWEEN "${valueItems[0]}" AND "${valueItems[1]}"`;
                        break;
                }
            } else {
               where = `${where} AND ${item.search} = "${item.value}"`;
            }

               
           
        }
        console.log(where)
        return where;
    }
}