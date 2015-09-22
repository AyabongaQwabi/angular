var app = angular.module('spaza',[])

app.controller('Store',['$scope','$http',function($scope,$http){

				$scope.fruits=[{name:'banana',weight:'1kg',price:10},{name:'apple',weight:'2kg',price:11}]
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
					var product ={name:$scope.pname,weight:$scope.pweight,price:$scope.pprice}
					$scope.add(product)
				}
				$scope.employees=[];
				$http.get("http://www.w3schools.com/angular/customers.php").success(function(data){$scope.employees = data.records;console.log(data)})

}]);

