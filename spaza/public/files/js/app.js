console.log('loading ang script')
var app = angular.module('spaza',['ngRoute'])

app.config(['$routeProvider',function($routeProvider) {
	
            $routeProvider.
                when('/', {
                    templateUrl : 'views/main.html',
                    controller : 'spazaCtrl'
                })
                 .when('/login', {
                    templateUrl : 'views/login.html',
                    controller : 'Store'
                })
                .when('/dashboard', {
                    templateUrl: 'views/spazaApp.html',
                    controller: 'Store'
                })
                .when('/products', {
                    templateUrl: 'views/productsView.html',
                    controller: 'Store'
                })
                .when('/employees',{
                    templateUrl:'views/employeesView.html',
                    controller:'Store'
                })
                .when('/sales', {
                    templateUrl: 'views/salesView.html',
                    controller: 'Store'
                })
                .when('/purchases',{
                    templateUrl:'views/purchasesView.html',
                    controller:'Store'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }]);
var loggedInUser;
app.controller('Store',['$scope','$location','$http',function($scope,$location,$http){
                console.log('loading controller')
                $scope.store =loggedInUser;
                $scope.loginUsername='';
                $scope.loginPassword='';
                
                $scope.ang = 'WORKING'
                $scope.login = function(){
                    var data = {username:$scope.loginUsername,password:$scope.loginPassword}
                    console.log('Login init')
                    $http.post("http://localhost:5000/ang/users/login",data)
                    .success(function(data){
                       loggedInUser=data[0];
                       $scope.store=data[0];
                       console.log($scope.store)
                        console.log(data)
                        console.log('logged in ')
                         $scope.initiate();
                        $location.path('/dashboard')
                        console.log('### \t\t STORE')
                        console.log($scope.store)
                        console.log('.........')

                    })
                    .error(function(err){
                        console.log('LOGIN UNSUXES :\t'+err)
                    })

                }



               $scope.initiate = function(){

                    $scope.employees=[];
                    var emp_request ="http://localhost:5000/ang/employees/add/:"+$scope.store.storename
                    $http.get(emp_request)
                        .success(
                             function(data){
                                $scope.employees = data.records;})
                    
                    $scope.products;
                    var prd_request ="http://localhost:5000/ang/products/:"+$scope.store.storename
                    $http.get(prd_request)
                            .success(
                                function(data){
                                    $scope.products=data;})
                    //console.log($scope.products)
                    
                    $scope.sales;
                    var sales_request ="http://localhost:5000/ang/sales/:"+$scope.store.storename
                    $http.get(sales_request)
                            .success(
                                function(data){                                
                                    $scope.sales=data;})

                    $scope.purchases;
                    var pur_request ="http://localhost:5000/ang/purchases/:"+$scope.store.storename
                    $http.get(pur_request)
                            .success(
                                function(data){
                                    $scope.purchases=data;})

               }

                

                $scope.getSupplierList=function(){
                    
                        var listElem = angular.element('#supplierList')
                        listElem.html('')

                        var html="<li>"+
                                    "<a >"+
                                        "<span class='badge'><span class='glyphicon glyphicon-asterisk'>  "+   
                                        "</span> new </span>"+
                                    "</a>"+
                                  "</li>";

                        for(i=0;i<5;i++){
                            html +=('<li><a>Supplier '+i+'</a></li>')
                        }

                        listElem.html(html)
               }

                $scope.getCategoryList=function(){
                    
                        var listElem = angular.element('#categoryList')
                        listElem.html('')

                        var html="<li>"+
                                    "<a >"+
                                        "<span class='badge'><span class='glyphicon glyphicon-asterisk'>  "+   
                                        "</span> new </span>"+
                                    "</a>"+
                                  "</li>";

                        for(i=0;i<5;i++){
                            html +=('<li><a>category '+i+'</a></li>')
                        }

                        listElem.html(html)
               }
                
                
                $scope.fruits=[
                                {id:1,name:'banana',weight:'1kg',price:10},
                                {id:2,name:'apple',weight:'2kg',price:11}
                              ]

                $scope.storename = 'Mamba Veg'
                $scope.city = 'Cape Town';
                $scope.launchDate = new Date('2015','06','12')
                $scope.profits = 562.45

                $scope.add = function(product){
                     var request ="http://localhost:5000/ang/products/add/:"+$scope.store.storename
                    $http.post(request,product)
                    .success(
                         function(data){
                            
                                 console.log('added '+JSON.stringify(product))
                         }
                    )
                }



                $scope.pname='';
                $scope.pweight=0;
                $scope.pprice=0;
                $scope.addProduct = function(){
                    console.log('AddProduct initiated')
                    $scope.addProduct=!$scope.addProduct;
                    $scope.addProductButton=!$scope.addProductButton;
                    var product ={id:$scope.fruits.length+1,name:$scope.pname,weight:$scope.pweight,price:$scope.pprice}
                    $scope.add(product)
                }


                $scope.supplierName;
                $scope.addNewSupplier = function(){
                    $scope.addSupplier=!$scope.addSupplier;
                    $scope.addSupplierButton=!$scope.addSupplierButton;
                    var supplier = {name:$scope.supplierName};
                     var request ="http://localhost:5000/ang/suppliers/add/:"+$scope.store.storename
                    $http.post(request,supplier)
                    .success(
                         function(data){
                            
                                 console.log('added '+JSON.stringify(product))
                         }
                    )
                    .error(function(err){
                        console.log('ERR\t\t'+err)
                    })
                }



                $scope.init= function(){
                    $scope.addProduct=false;
                    $scope.addProductButton=true
                    $scope.addSupplier=false;
                    $scope.addSupBtn=true
                }



                $scope.epname='';
                $scope.epweight=0;
                $scope.epprice=0;
                $scope.inedit=0;
                $scope.closeEditor = function(){
                     $scope.edit = !$scope.edit;
                     $scope.epname='';
                    $scope.epweight=0;
                    $scope.epprice=0;
                    $scope.inedit=0;
                }




                $scope.loadEditor = function(fruit){
                    if($scope.epname!=fruit.name && $scope.epname!=''){
                          $scope.edit = $scope.edit;
                    }
                    else{
                            $scope.edit = !$scope.edit;
                    }
                
                    $scope.epname =fruit.name;
                    $scope.epweight=fruit.weight;
                    $scope.epprice =fruit.price;
                    $scope.inedit=fruit.id;
                   window.scrollTo(10,10);

                }
                $scope.save=function(){
                    //console.log($scope.fruits)
                    //console.log($scope.inedit)
                    //console.log($scope.fruits[$scope.inedit])
                    $scope.fruits[$scope.inedit-1]['name']=$scope.epname;
                    $scope.fruits[$scope.inedit-1]['weight']=$scope.epweight;
                    $scope.fruits[$scope.inedit-1]['price']=$scope.epprice;
                    $scope.edit=!$scope.edit
                }
                 console.log('------------STORE--------------------')
                console.log($scope.store)
                console.log('-------------------------------------')
}]);

