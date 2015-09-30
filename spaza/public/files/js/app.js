console.log('\t MAIN SCRIPT LOAD\n\n')
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
                console.log('\t\t---* CONTROLLER LOAD *---')
                
                //GLOBAL VARIABLES
                $scope.store =loggedInUser;
                $scope.loginUsername='';
                $scope.loginPassword='';
                $scope.Categories;
                $scope.Suppliers;
                $scope.products;
                $scope.employees;
                $scope.sales;
                $scope.purchases;

                // VIEW OPTION BOOLEANS
                $scope.addProduct;
                $scope.addProductButton;
                $scope.showCat;
                $scope.showCatButton;
                $scope.addCat;
                $scope.addCatButton;
                $scope.scanProduct;
                $scope.scanProductButton;


                //ADDITION VARIABLES
                $scope.pname='';
                $scope.pweight=0;
                $scope.pprice=0;
                $scope.supplierName;
                $scope.catName;
                $scope.selectedCategory = function(id){
                    //console.log('Selects category')
                    $scope.getCategoryList();
                    $scope.Categories.forEach(function(cat){
                        if(cat['id']==id){
                            $scope.category = cat.name;
                            $scope.selectedCat=cat;
                        }
                    })
                }
                 $scope.editorCategory = function(id){
                    //console.log('Selects category')
                    $scope.getCategoryList();
                    $scope.Categories.forEach(function(cat){
                        if(cat['id']==id){
                            $scope.editCategory = cat.name;
                            $scope.editorSelectedCatID=id;
                            console.log($scope.editorSelectedCat)
                        }
                    })
                }
                $scope.getCatID = function(name){                   
                    $scope.getCategoryList();
                    $scope.Categories.forEach(function(cat){
                        console.log('cat.name:'+cat['name'].toLowerCase()+' '+'name:'+name.toLowerCase())
                        console.log(cat['name'].toLowerCase().trim() == name.toLowerCase().trim())
                        if(cat['name'].toLowerCase().trim() == name.toLowerCase().trim()){
                            $scope.editorSelectedCatID = cat['id']
                            console.log('MATHC')

                        }
                        
                    })
                }
                $scope.selectedSupplier = function(id){
                    //console.log('Selects Supplier')
                    $scope.getSupplierList();
                    $scope.Suppliers.forEach(function(sup){
                        if(sup['id']==id){
                            $scope.supplier = sup.name;
                        }
                    })
                }


                //DATA RETRIEVAL & POSTING METHODS
                
                $scope.getProducts = function(){
                    console.log
                    var prd_request ="http://localhost:5000/ang/products/:"+$scope.store.storename
                    $http.get(prd_request)
                            .success(
                                function(data){
                                    console.log('retrieved products')
                                    console.log(data)
                                    $scope.products=data;})
                }
                $scope.getEmployees= function(){
                    var emp_request ="http://localhost:5000/ang/employees/:"+$scope.store.storename
                    $http.get(emp_request)
                        .success(
                             function(data){
                                $scope.employees = data.records;})
                }
                $scope.getSales = function(){
                    var sales_request ="http://localhost:5000/ang/sales/:"+$scope.store.storename
                    $http.get(sales_request)
                            .success(
                                function(data){                                
                                    $scope.sales=data;})
                }
                $scope.getPurchases = function(){
                    var pur_request ="http://localhost:5000/ang/purchases/:"+$scope.store.storename
                    $http.get(pur_request)
                            .success(
                                function(data){
                                    $scope.purchases=data;})
                }
                $scope.initiate = function(){

                    $scope.getCategoryList();
                    $scope.getProducts();
                    $scope.getEmployees(); 
                    $scope.getSales();
                    $scope.getPurchases();
                }
                $scope.login = function(){
                    var data = {username:$scope.loginUsername,password:$scope.loginPassword}
                    console.log('Login init')
                    $http.post("http://localhost:5000/ang/users/login",data)
                    .success(function(data){
                       loggedInUser=data[0];
                       $scope.store=data[0];
                       //console.log($scope.store)
                        //console.log(data)
                        //console.log('logged in ')
                         $scope.initiate();
                        $location.path('/dashboard')
                        //console.log('### \t\t STORE')
                        //console.log($scope.store)
                        //console.log('.........')

                    })
                    .error(function(err){
                        //console.log('LOGIN UNSUXES :\t'+err)
                    })
                }
                $scope.getSupplierList=function(){
                    
                     //console.log('Fetching Suppliers')
                     var req = "http://localhost:5000/ang/suppliers/:"+$scope.store.storename
                     var data;
                     $http.get(req)
                          .success(
                                function(data){
                                    $scope.Suppliers = data;
                                   
                                    console.log('Succesfully got suppliers')
                                    //console.log($scope.Suppliers)
                                    //console.log(data)
                                })
                          .error(function(err){
                                console.log('\tError fetching suppliers\n\t'+err)
                          })
                }
                $scope.getCategoryList=function(){
                     console.log('Fetching Categories')
                     var req = "http://localhost:5000/ang/products/categories/:"+$scope.store.storename
                     var data;
                     $http.get(req)
                          .success(
                                function(data){
                                    $scope.Categories = data;
                                    console.log('Succesfully got categories')
                                    //console.log($scope.Categories)
                                    //console.log(data)
                                })
                          .error(function(err){
                                console.log('\tError fetching categories\n\t'+err)
                          })
                }               
                $scope.viewCategories = function(){
                    $scope.showCat=!$scope.showCat;
                    $scope.showCatButton=!$scope.showCatButton
                }
                $scope.scanNewProduct = function(){
                    $scope.scanProduct=!$scope.scanProduct;
                    $scope.scanProductButton=!$scope.scanProductButton;
                }
                $scope.addCategory = function(){
                    $scope.addCat=!$scope.addCat;
                    $scope.addCatButton=!$scope.addCatButton;
                   
                    $scope.showCat=!$scope.showCat;
                    $scope.showCat=!$scope.showCat;
                }
                $scope.deleteProduct = function(id){
                    var prd_request ="http://localhost:5000/ang/products/delete/:"+$scope.store.storename+'/:'+id
                    $http.post(prd_request)
                            .success(
                                function(data){
                                    console.log('Deleted product')
                                    console.log(data)
                                    $scope.products=data;})
                    $scope.getProducts();
                }               
                $scope.addNewProduct = function(){
                    $scope.addProduct=!$scope.addProduct;
                    $scope.addProductButton=!$scope.addProductButton;
                     var data ={

                                name:$scope.pname,
                                price:$scope.pprice,
                                categoryID:$scope.selectedCat.id
                    }
                    //console.log(data)
                    var request ="http://localhost:5000/ang/products/add/:"+$scope.store.storename
                    $http.post(request,data)
                    .success(
                         function(data){
                            
                                 console.log('added '+JSON.stringify(cat))
                         }
                    )
                    .error(function(err){
                        console.log('ERR\t\t'+err)
                    })
                    $scope.getProducts();
                }

                $scope.init= function(){

                    $scope.addProduct=false;
                    $scope.addProductButton=true
                    $scope.scanProduct=false;
                    $scope.scanProductButton=true
                    $scope.addCat=false;
                    $scope.addCatButton=true;
                    $scope.showCat=false;
                    $scope.showCatButton=true;
                    $scope.addSupplier=false;
                    $scope.addSupBtn=true
                    $scope.category='select';
                    $scope.selectedCat;
                    $scope.editorSelectedCat;
                    $scope.supplier='select';
                    $scope.getCategoryList();
                    $scope.getSupplierList();
                    $scope.getProducts();
                    $scope.getPurchases;
                    $scope.getSales ;
                    $scope.getEmployees
                }







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
                $scope.addProduct = function(){
                    console.log('AddProduct initiated')
                    $scope.addProduct=!$scope.addProduct;
                    $scope.addProductButton=!$scope.addProductButton;
                    var product ={name:$scope.pname,price:$scope.pprice}
                }  
                $scope.updateProduct = function(){
                    console.log('editing')
                   
                    var data = {id:$scope.inedit,name:$scope.epname,price:$scope.epprice,categoryID: $scope.editorSelectedCatID}
                    var request ="http://localhost:5000/ang/products/edit/:"+$scope.store.storename+'/:'+data.id
                    $http.post(request,data)
                    .success(
                         function(data){
                            
                                 console.log('added \n'+JSON.stringify(data))
                         }
                    )
                    .error(function(err){
                        console.log('*ERR\t\t'+err)
                    })
                    
                }              
                $scope.addNewSupplier = function(){
                    $scope.addSupplier=!$scope.addSupplier;
                    $scope.addSupplierButton=!$scope.addSupplierButton;
                    var supplier = {name:$scope.supplierName};
                     var request ="http://localhost:5000/ang/suppliers/add/:"+$scope.store.storename
                    $http.post(request,supplier)
                    .success(
                         function(data){
                            
                                 console.log('added '+JSON.stringify(supplier))
                         }
                    )
                    .error(function(err){
                        console.log('ERR\t\t'+err)
                    })
                }                
                $scope.addNewCategory = function(){
                    $scope.addCat=!$scope.addCat;
                    $scope.addCatButton=!$scope.addCatButton;
                    var cat = {name:$scope.catName};
                     var request ="http://localhost:5000/ang/products/categories/add/:"+$scope.store.storename
                    $http.post(request,cat)
                    .success(
                         function(data){
                            
                                 console.log('added '+JSON.stringify(cat))
                         }
                    )
                    .error(function(err){
                        console.log('ERR\t\t'+err)
                    })
                     $scope.getCategoryList();
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
                $scope.loadEditor = function(product){
                    if($scope.epname!=product.name && $scope.epname!=''){
                          $scope.edit = $scope.edit;
                    }
                    else{
                            $scope.edit = !$scope.edit;
                    }
                
                    $scope.epname =product.name;
                    $scope.editCategory=product.category;
                    $scope.epprice =product.price;
                    $scope.inedit=product.id;
                    $scope.getCatID(product.category)
                   window.scrollTo(10,10);
                }
              
               
}]);

