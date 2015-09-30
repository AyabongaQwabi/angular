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
			            	
			        connection.query('select products.name as name,categories.id as catid,categories.name as category,products.id as prodID from products,categories where products.category_id = categories.id ORDER BY  categories.id ASC', function(err,rows){
								
				        res.send(rows);      
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
                    console.log('ADDING PRODUCT ->\t\t'+JSON.stringify(req.body))
                    connection.query('insert into products set ?',req.body, function(err,rows){
                        
                        if(err){
                            console.log('ERR:\n\t'+err)
                        }
                        else{
                            console.log('PRODUCT:'+JSON.stringify(req.body)+'Added succesfully')
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
                    console.log('DELETING PRODUCT ->\t\t'+JSON.stringify(req.body))
                    connection.query('delete * from products where id = ?',req.params.id, function(err,rows){
                        
                        if(err){
                            console.log('ERR:\n\t'+err)
                        }
                        else{
                            console.log('product DELETED succesfully')
                        }   
                    }); 
                    connection.end();
        

	})
}

exports.categories =function(req,res,next){
    req.getConnection(function(err,connection){

                    var connection = mysql.createConnection(dbOptions)
                    connection.connect();
                      connection.query("SELECT DATE_FORMAT(purchases.date,'%d %b %y') as date, products.name as product, purchases.price, suppliers.name as supplier FROM purchases, products, suppliers WHERE products.id = purchases.product_id AND suppliers.id = purchases.supplier_id ORDER BY date",
                        function(err,results){


                    res.send(results);

                                
                    });
                    connection.end();
                       
        

    })
}