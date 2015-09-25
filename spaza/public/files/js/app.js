var app = angular.module('spaza',['ngRoute'])

app.config(['$routeProvider',function($routeProvider) {
	
            $routeProvider.
                when('/', {
                    templateUrl : 'views/main.html',
                    controller : 'spazaCtrl'
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

app.controller('Store',['$scope','$location','$http',function($scope,$location,$http){
                $scope.store;
                
                $http.get("http://172.18.0.108:8080/ang/users/demo")
                    .success(function(data){
                       $scope.store=data[0];
                       console.log($scope.store)
                        console.log(data)
                        console.log('done')
                    });
                

               
                
                
                $scope.fruits=[{id:1,name:'banana',weight:'1kg',price:10},{id:2,name:'apple',weight:'2kg',price:11}]
                $scope.storename = 'Mamba Veg'
                $scope.city = 'Cape Town';
                $scope.launchDate = new Date('2015','06','12')
                $scope.profits = 562.45

                $scope.add = function(product){
                    $scope.fruits.push(product)
                    console.log('added '+JSON.stringify(product))
                }

                $scope.pname='';
                $scope.pweight=0;
                $scope.pprice=0;

                $scope.addProduct = function(){
                    console.log('AddProduct initiated')

                    var product ={id:$scope.fruits.length+1,name:$scope.pname,weight:$scope.pweight,price:$scope.pprice}
                    $scope.add(product)
                }
                $scope.employees=[];
                $http.get("http://www.w3schools.com/angular/customers.php").success(function(data){$scope.employees = data.records;})
                $scope.products;
                $http.get('http://127.0.0.1:8080/products/all').success(function(data){$scope.products=data;})
                //console.log($scope.products)
                $scope.sales;
                $http.get('http://127.0.0.1:8080/ang/users/demo/sales').success(function(data){$scope.sales=data;})
                $scope.purchases;
                $http.get('http://127.0.0.1:8080/ang/users/demo/purchases').success(function(data){$scope.purchases=data;})


                $scope.epname='';
                $scope.epweight=0;
                $scope.epprice=0;
                $scope.inedit=0;

                $scope.loadEditor = function(fruit){
                    //console.log('FRUIT:'+fruit)
                    $scope.edit = !$scope.edit;
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

