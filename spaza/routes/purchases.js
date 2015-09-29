var mysql = require('mysql');
exports.get =function(req,res,next){
	req.getConnection(function(err,connection){

				   var store = req.params.storename.substring(1);
                   var connection = mysql.createConnection( {
                                    host : "localhost",
                                    user : "root",
                                    password : "theaya5379",
                                    port : 3306,
                                    database : store

                                })
                  connection.connect();
                  connection.query("SELECT DATE_FORMAT(purchases.date,'%d %b %y') as date, products.name as product, purchases.price, suppliers.name as supplier FROM purchases, products, suppliers WHERE products.id = purchases.product_id AND suppliers.id = purchases.supplier_id ORDER BY date",
                      function(err,results){

                            if(err){
                                console.log('err getting purchases :\t\t')
                            }
                            else{
                                res.send(results)
                                console.log('purchase retrieval succesfull!')
                            }

                                
                  });
                  connection.end();

	})
}

exports.add =function(req,res,next){
	req.getConnection(function(err,connection){

		           var store = req.params.storename.substring(1);
                   var connection = mysql.createConnection( {
                                    host : "localhost",
                                    user : "root",
                                    password : "theaya5379",
                                    port : 3306,
                                    database : store

                                })
                    console.log('ADDING PURCAHSE ->\t\t'+JSON.stringify(req.body))
                    connection.query('insert into purchase set ?',req.body, function(err,rows){
                        
                        if(err){
                            console.log('ERR:\n\t'+err)
                        }
                        else{
                            console.log('PURCHASE:'+JSON.stringify(req.body)+'Added succesfully')
                        }   
                    }); 
                    connection.end();

	})
}

exports.delete =function(req,res,next){
	req.getConnection(function(err,connection){

		           var store = req.params.storename.substring(1);
                   var connection = mysql.createConnection( {
                                    host : "localhost",
                                    user : "root",
                                    password : "theaya5379",
                                    port : 3306,
                                    database : store

                                })
                    console.log('DELETING PURCHASE ->\t\t'+JSON.stringify(req.body))
                    connection.query('delete * from purchase where id = ?',req.params.id, function(err,rows){
                        
                        if(err){
                            console.log('ERR:\n\t'+err)
                        }
                        else{
                            console.log('purchase DELETED succesfully')
                        }   
                    }); 
                    connection.end();
        

	})
}