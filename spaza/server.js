//------------------------- import modules to use --------------------------------------//


            var express = require('express');
            var products = require('./routes/products')
            var sales = require('./routes/sales')
            var purchases = require('./routes/purchases')
            var users = require('./routes/users')
            var employees = require('./routes/employees')
            var suppliers = require('./routes/suppliers')
        
//------------------ initialize objects ----------------------------------------------//


            var app = express();
     
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



//-----------------  setup middleware  -----------------------------------------------//

            app.use(express.static('public'))
	           app.use(function (req, res, next) {

				    // Website you wish to allow to connect
				    res.setHeader('Access-Control-Allow-Origin', 'http://localhosty:5000');

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
	        var bodyParser = require('body-parser')
			app.use(bodyParser.urlencoded({ extended: false }))
            app.use(bodyParser.json())
            app.use(myConnection(mysql, dbOptions, 'single'));

//------------------  configure routes -----------------------------------------------//
  
             app.get('/',function(req,res){
                    res.sendfile('public/index.html')
                })

            app.get('/ang/sales/:storename',sales.get)
            app.get('/ang/sales/add/:storename',sales.add)
            app.get('/ang/sales/delete/:storename/:id',sales.delete)

            app.get('/ang/employees/:storename',employees.get)
            app.get('/ang/employees/add/:storename',employees.add)
            app.get('/ang/employees/delete/:storename/:id',employees.delete)


            app.get('/ang/products/:storename',products.get)
            app.get('/ang/products/categories/:storename',products.categories)
            app.post('/ang/products/categories/add/:storename',products.addCategory)
            app.post('/ang/products/add/:storename',products.add)
            app.post('/ang/products/delete/:storename/:id',products.delete)

            app.get('/ang/users/all',users.all)
            app.get('/ang/users/:id',users.get)
            app.post('/ang/users/add',users.add)
            app.post('/ang/users/add/init',users.init)
            app.post('/ang/users/login',users.login)

            app.get('/ang/purchases/:storename',purchases.get);
            app.get('/ang/purchases/add/:storename',purchases.add);
            app.get('/ang/purchases/delete/:storename',purchases.delete);

            app.get('/ang/suppliers/:storename',suppliers.get);
            app.post('/ang/suppliers/add/:storename',suppliers.add);
            app.post('/ang/suppliers/delete/:storename',suppliers.delete);
            
           
app.listen(5000)


             


