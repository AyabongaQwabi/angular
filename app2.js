var app = angular.module('spaza',[])

app.controller('Store',['$scope','$http',function($scope,$http){

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
				$http.get("http://www.w3schools.com/angular/customers.php").success(function(data){$scope.employees = data.records;console.log(data)})
				$scope.epname='';
				$scope.epweight=0;
				$scope.epprice=0;
				$scope.inedit=0;

				$scope.loadEditor = function(fruit){
					console.log('FRUIT:'+fruit)
					$scope.edit = !$scope.edit;
					$scope.epname =fruit.name;
					$scope.epweight=fruit.weight;
					$scope.epprice =fruit.price;
					$scope.inedit=fruit.id;

				}
				$scope.save=function(){
					console.log($scope.fruits)
					console.log($scope.inedit)
					console.log($scope.fruits[$scope.inedit])
					$scope.fruits[$scope.inedit-1]['name']=$scope.epname;
					$scope.fruits[$scope.inedit-1]['weight']=$scope.epweight;
					$scope.fruits[$scope.inedit-1]['price']=$scope.epprice;
					$scope.edit=!$scope.edit
				}
}]);

