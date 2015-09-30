var mysql = require('mysql');
exports.all = function(req,res,next){
	req.getConnection(function(err,connection){

		 var connection = mysql.createConnection( {
                                    host : "localhost",
                                    user : "root",
                                    password : "theaya5379",
                                    port : 3306,
                                    database : 'spazas'

                                })
                 connection.query('select * from user',function(err,results){
                        res.send(results)
                })
         connection.end();
	})
}

exports.get = function(req,res,next){
	req.getConnection(function(err,connection){
		var connection = mysql.createConnection( {
                                    host : "localhost",
                                    user : "root",
                                    password : "theaya5379",
                                    port : 3306,
                                    database : 'spazas'

                                })
        connection.query('select * from user where id = ?',req.params.id,function(err,results){
            res.send(results)
            console.log('Request USER details')
            console.log('results :\t\t'+JSON.stringify(results))
           if(err){
           		console.log('ERR:\t\t'+err)
           }
        })
        connection.end();
	})
}

exports.add = function(req,res,next){
	req.getConnection(function(err,connection){

		var connection = mysql.createConnection( {
                                    host : "localhost",
                                    user : "root",
                                    password : "theaya5379",
                                    port : 3306,
                                    database : 'spazas'

                                })
        var input = JSON.parse(JSON.stringify(req.body));
        var qry = 'create database '+input.storename+';'
               
        connection.query(qry,function(err,result){
	         if(err){
	          		console.log('ERR:\n\t'+err)
	         }
	         else{
		          console.log('db created succesfuly')
		          res.send('db created succesfuly')
	         }
        })
        connection.query('insert into user set ?',input,function(err,result){
             if(err){
                    console.log('ERR:\n\t'+err)
             }
             else{
                  console.log('user added succesfuly')
                 
             }
        })
        connection.end();
	})
}

exports.init = function(req,res,next){
	req.getConnection(function(err,connection){
        console.log('creation')
		var input = JSON.parse(JSON.stringify(req.body));
        var cp = require("child_process");
		var cmdLine = "mysql --user=root --password=theaya5379 "+input.storename+" < create-tables.sql";
		cp.exec(cmdLine, function(error,stdout,stderr) {
				  console.log(error,stdout,stderr);
		});
		  
	})
}

exports.login = function(req,res,next){
	req.getConnection(function(err,connection){

		           var connection = mysql.createConnection( {
                                    host : "localhost",
                                    user : "root",
                                    password : "theaya5379",
                                    port : 3306,
                                    database : 'spazas'

                                })

                    connection.query('select * from user',function(err,results){

                        if(err){
                        	console.log("ERR : "+err)
                        }


                        var Found=false;
                        console.log("\n\nUSERS\n");
                        
                        var user;
                        results.forEach(function(result){                             
                           
                            var hashedPassword =result.password;
                            var clientPassword =req.body.password;

                            var correctPassword = (hashedPassword==clientPassword)
                           // console.log('\nCOMPARING:\t'+result.username+" && "+req.body.username)
                            //console.log('PASS:\t'+result.password+" && "+req.body.password)
                            if(result.username==req.body.username && correctPassword)
                            {                               
                                Found=!Found;
                                user=result;
                                //console.log(req.body.username+" is found")
                               /* req.session.userEntryLevel = result.entry_level
                                var usertype ='';
                                if(req.session.userEntryLevel==1){
                                    usertype='admin'
                                }
                                else{
                                    usertype='viewer'
                                }
                                req.session.usertype=usertype;*/

                            }

                        })
                        if(Found){
                           // req.session.username = req.body.name
                           	 connection.query('select * from user where id = ?',user.id,function(err,results){
					            
						           if(err){
						           		console.log('ERR:\t\t'+err)
						           }
						           else{
							           	res.send(results)
							            console.log('\t\tLogged IN USER details')
							            console.log('\t\tresults :\t\t'+JSON.stringify(results))
						           }

					        })
        					connection.end();
                           
                             
                             
                        }
                        
                    
                })
		  
	})
}