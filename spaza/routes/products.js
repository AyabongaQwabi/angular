var mysql = require('mysql');
exports.get =function(req,res,next){
	req.getConnection(function(err,connection){
                    console.log('\t\t------Fetching PRODUCTS -----')
				   var store = req.params.storename.substring(1);
		           var connection = mysql.createConnection( {
		                                  host : "localhost",
		                                  user : "root",
		                                  password : "theaya5379",
		                                        port : 3306,
		                                  database : store

		                             })
			            	
			        connection.query('select product.id,product.name as name,product.price,categories.name as category from product,categories where product.categoryID = categories.id ', function(err,rows){
						if(err)	{
                            console.log('\t\tError fetching products: '+err)
                        }
                        else{
                            console.log('\t\tsuccessfully fetched products')
                            console.log(JSON.stringify(rows))
                            res.send(rows);
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
                    console.log('ADDING PRODUCT ->\t\t'+JSON.stringify(req.body))
                    connection.query('insert into product set ?',req.body, function(err,rows){
                        
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
exports.addCategory =function(req,res,next){
    req.getConnection(function(err,connection){

                   var store = req.params.storename.substring(1);
                   var connection = mysql.createConnection( {
                                    host : "localhost",
                                    user : "root",
                                    password : "theaya5379",
                                    port : 3306,
                                    database : store

                                })
                    console.log('ADDING CATEGORY ->\t\t'+JSON.stringify(req.body))
                    connection.query('insert into categories set ?',req.body, function(err,rows){
                        
                        if(err){
                            console.log('ERR:\n\t'+err)
                        }
                        else{
                            console.log('CATEGORY:'+JSON.stringify(req.body)+'Added succesfully')
                        }   
                    }); 
                    connection.end();

    })
}
exports.delete =function(req,res,next){
	req.getConnection(function(err,connection){
                console.log('\n\n\n\\nDELETE CALLED \n')
		           var store = req.params.storename.substring(1);
                   var connection = mysql.createConnection( {
                                    host : "localhost",
                                    user : "root",
                                    password : "theaya5379",
                                    port : 3306,
                                    database : store

                                })
                    console.log('DELETING PRODUCT ->\t\t'+JSON.stringify(req.body))
                    connection.query('delete from product where id = ?',parseInt(req.params.id.substring(1)), function(err,rows){
                        
                        if(err){
                            console.log('ERR:\n\t'+err)
                        }
                        else{
                            console.log('product DELETED succesfully\n\n')
                        }   
                    }); 
                    connection.end();
        

	})
}

exports.categories =function(req,res,next){
    req.getConnection(function(err,connection){
                    console.log('\n\t\t--------Client Requests Categories ----------- ')
                   var store = req.params.storename.substring(1);
                   var connection = mysql.createConnection( {
                                    host : "localhost",
                                    user : "root",
                                    password : "theaya5379",
                                    port : 3306,
                                    database : store

                                })
                    connection.connect();
                    connection.query("select * from categories",
                        function(err,results){

                            if(err){
                                console.log('Err fetching categories :\t\t'+err)
                            }
                            else{
                                console.log('Results fetched Succesfully')
                                res.send(results);
                            }
                          

                                
                    });
                    connection.end();
                    console.log('\t\t------------End\n\n')
        

    })
}

exports.update = function(req, res, next){
        console.log("\n\n\n\n\t------UPDATING")
        var data =req.body;
        console.log("DATA :"+JSON.stringify(data))
        var id = req.body.id;
        console.log("############# ID:"+id)
        req.getConnection(function(err, connection){
            var store = req.params.storename.substring(1);
            var connection = mysql.createConnection( {
                                    host : "localhost",
                                    user : "root",
                                    password : "theaya5379",
                                    port : 3306,
                                    database : store

                                })
            connection.connect();
            connection.query('UPDATE product SET ? WHERE id = ?', [data, id], function(err, rows){
                if (err){
                        console.log("Error Updating : %s ",err );
                }
                else{
                    res.send('success');
                    console.log('LOADED UPDATE '+JSON.stringify(data))
                }
                
            });
            
    });
};