//------------------------- import modules to use --------------------------------------//


            var express = require('express');
        
//------------------ initialize objects ----------------------------------------------//


            var app = express();
     




//-----------------  setup middleware  -----------------------------------------------//

            app.use(express.static('public'))
           



//------------------  configure routes -----------------------------------------------//

            app.get('/',function(req,res){
                    res.sendfile('public/index.html')
                })

app.listen(5000)


             


