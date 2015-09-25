spazaApp.controller('backend',['$scope',function($scope,$filter){

								

								$scope.products = []
								$scope.products.push({name:'Milk',price:5.3,units:12})
								$scope.products.push({name:'Banana',price:2.50,units:6})
								$scope.products.push({name:'Ultramel',price:27.50,units:7})
								$scope.products.push({name:'Bread',price:10,units:14})
								$scope.ls =function (){return min($scope.products,'units').name +" with "+ min($scope.products,'units').units+" units";}
								$scope.hs=function(){return max($scope.products,'units').name +" with "+ max($scope.products,'units').units+" units";}
								$scope._profits=function(){return profise(sales,units)}
								$scope.newSale = function(i){
										$scope.products[i].units+=1;										
										$scope.highest_sale = $scope.hs();								
										$scope.lowest_sale = $scope.ls();
										$scope.profits =$scope._profits();

								}
								


								var units =[]
								$scope.products.forEach(function(product){
									units.push(product.units)
								})
								var sales =[]
								$scope.products.forEach(function(product){
									sales.push(product.price)
								})
								 $scope._totalunits=function(){return sum(units)};
								$scope.totalunits = $scope._totalunits();
								console.log($scope._totalunits()+" - "+$scope.totalunits)
								
								$scope.profits =$scope._profits();
								//$scope.profits = $filter('currency')(profits,'Rand')
								
								$scope.highest_sale = $scope.hs();
								
								$scope.lowest_sale = $scope.ls();

}])




function sum(arr){
	var sum = 0;
	arr.forEach(function(amnt){
		sum+=amnt
	})
	return sum;
}

function profise(arr1,arr2){
	sum=0;
	for(var i=0;i<=arr1.length-1;i++){
		sum+=(arr1[i]*arr2[i])
	}
	return sum;
}

function max(arr,arg){
	var max=arr[0]
	arr.forEach(function(i){
	
		if(i[arg]>max[arg]){max=i};
		
	});
	return max;
}
function min(arr,arg){
	var min=arr[0];
	arr.forEach(function(i){
		if(i[arg]<min[arg]){min=i};
	});
	return min;
}