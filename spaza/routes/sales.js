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

                 connection.query("select DATE_FORMAT(sales.date,'%d %b %y') as date, products.name, sales.quantity, sales.price,sales.product_id from sales,products where products.id = sales.product_id order by sales.date desc",

                     function(err,results){
                             if(err){
                             	console.log('err getting sales :\n\t')
                             }
                             else{
                             	console.log('sales retrieved succesfully!')
                             	res.send(results);
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
                    console.log('ADDING SALE ->\t\t'+JSON.stringify(req.body))
                    connection.query('insert into sale set ?',req.body, function(err,rows){
                        
                        if(err){
                            console.log('ERR:\n\t'+err)
                        }
                        else{
                            console.log('PRODUCT:'+JSON.stringify(req.body)+'sale Added succesfully!')
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
                    console.log('DELETING SALE ->\t\t'+JSON.stringify(req.body))
                    connection.query('delete * from sale where id = ?',req.params.id, function(err,rows){
                        
                        if(err){
                            console.log('ERR:\n\t'+err)
                        }
                        else{
                            console.log('sale DELETED succesfully')
                        }   
                    }); 
                    connection.end();
        

	})
}