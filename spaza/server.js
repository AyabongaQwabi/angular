//------------------------- import modules to use --------------------------------------//


            var express = require('express');
        
//------------------ initialize objects ----------------------------------------------//


            var app = express();
     




//-----------------  setup middleware  -----------------------------------------------//

            app.use(express.static('public'))
	           app.use(function (req, res, next) {

				    // Website you wish to allow to connect
				    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');

				    // Request methods you wish to allow
				    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

				    // Request headers you wish to allow
				    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

				    // Set to true if you need the website to include cookies in the requests sent
				    // to the API (e.g. in case you use sessions)
				    res.setHeader('Access-Control-Allow-Credentials', true);

				    // Pass to next layer of middleware
				    next();
	});



//------------------  configure routes -----------------------------------------------//
  var mysql = require('mysql');
myConnection = require('express-myconnection');
            //database = require('./database');
            var dbOptions = {
                host : "localhost",
                user : "root",
                password : "theaya5379",
                port : 3306,
                database : "Nelisa"

            }
              var dbOptions2 = {
                host : "localhost",
                user : "root",
                password : "theaya5379",
                port : 3306,
                database : "spazas"

            }

            app.get('/ang/users/demo/products/all',function(req,res){
            	   var connection = mysql.createConnection(dbOptions)
	            	
					connection.query('select products.name as name,categories.id as catid,categories.name as category,products.id as prodID from products,categories where products.category_id = categories.id ORDER BY  categories.id ASC', function(err,rows){
						
						res.send(rows);      
					}); 
		
            })


            app.get('/',function(req,res){
                    res.sendfile('public/index.html')
                })
           app.get('/ang/users/all',function(req,res){
                 var connection = mysql.createConnection(dbOptions2)
                    connection.query('select * from user',function(err,results){
                        res.send(results)
                    })
            })
             app.get('/ang/users/demo',function(req,res){
                 var connection = mysql.createConnection(dbOptions2)
                    connection.query('select * from user where id=4',function(err,results){
                        res.send(results)
                    })
            })
            app.post('/ang/users/add',function(req,res){
                
                var connection = mysql.createConnection(dbOptions2)
                var input = JSON.parse(JSON.stringify(req.body));
                
                var queryStr ='insert into user set ?'
                console.log ('DATA:\n'+JSON.stringify(input))
                connection.query(queryStr, input, function(err,results){
                    res.send('Spaza Created!');
                    console.log("-------ERR:"+err)
                    console.log("-------results:"+results)
                })
            })
            app.get('/ang/users/demo/purchases', function (req, res) {
                
                                var connection = mysql.createConnection(dbOptions)
                                connection.connect();
                                connection.query("SELECT DATE_FORMAT(purchases.date,'%d %b %y') as date, products.name as product, purchases.price, suppliers.name as supplier FROM purchases, products, suppliers WHERE products.id = purchases.product_id AND suppliers.id = purchases.supplier_id ORDER BY date",
                                    function(err,results){


                                res.send(results);

                                
                            });
                       
               
                
            });
            app.get('/ang/users/demo/categories', function (req, res) {
                
                                var connection = mysql.createConnection(dbOptions)
                                connection.connect();
                                connection.query("SELECT DATE_FORMAT(purchases.date,'%d %b %y') as date, products.name as product, purchases.price, suppliers.name as supplier FROM purchases, products, suppliers WHERE products.id = purchases.product_id AND suppliers.id = purchases.supplier_id ORDER BY date",
                                    function(err,results){


                                res.send(results);

                                
                            });
                       
               
                
           });
            app.get('/ang/users/demo/sales', function (req, res) {
                
                        var connection = mysql.createConnection(dbOptions)
                        connection.connect();

                        connection.query("select DATE_FORMAT(sales.date,'%d %b %y') as date, products.name, sales.quantity, sales.price,sales.product_id from sales,products where products.id = sales.product_id order by sales.date desc",

                            function(err,results){
                                    console.log('Client requests sales page : ' + err)   
                            
                                    res.send(results);
                        });
                       
               
                
        });
app.listen(5000)


             


