exports.getFilters = (req, res) => {
    let where = ` WHERE page_id=${req.params.page_id}`;
    const sql = `SELECT columns FROM arc_tables ${where}`;
    // console.log(sql)
    database.query(sql, (err, rows) => {
        if (err) { throw err; }
       
        
        let filters = JSON.parse(rows[0].columns);
        filters = filters.filter(col => col.filter_enable).map(col => {
            if(col.filter_enable) {
                return {
                    key: col.key,
                    filterLabel: col.filter_label,
                    filterType: col.filter_type,
                    filterSelected: col.filter_selected
                }
            }
        });
        // console.log(filters)
        res.send({
            "status": "success",
            data: filters
        });

    });
}

exports.getFilterOptions = (req, res) => {
    const page_id = req.params.page_id;
    const key = req.body.key;
    const search = req.body.search;
    
    let sql = `SELECT table_name FROM  arc_table_page WHERE page_id = ${page_id}`;
    console.log(sql);
    database.query(sql, (err, tableNameRow) => {
        if (err) { throw err; }

        let where = ' WHERE 1 = 1';
        if(search) {
            where = `${where} AND ${key} LIKE '%${search}%'`;
        }
        sql = `SELECT user_id, ${key} FROM ${tableNameRow[0]['table_name']} ${where}`;
        console.log(sql)
        database.query(sql, (err, rows) => {
            if (err) { throw err; }
            res.send({
                "status": "success",
                data: rows
            });
        });
    })
}

// namespace = {
//     createFilters: (search) => {
//         let where = ' WHERE 1= 1 ';
//         for (let item of search) {
//             Object.entries(item).forEach((entry) => {
//                 const [key, value] = entry;
//                 // console.log(`${key}: ${value}`);
//                 where = `${where} AND ${key} = ${value}`;
//             });
//         }
//         return where;
//     }
// }