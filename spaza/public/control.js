app.controller('spazaCtrl',['$scope','$http',function($scope,$http){
			$scope.create;

			$scope.main = {
					heading:'mySpaza',
					brief:'Manage your Spazashop from your PC or Cellphone'
			}
			$scope.loadCreate = function(){
				$scope.create=true;
			}

}])

