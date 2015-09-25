app.controller('spazaCtrl',['$scope','$http','$location','$anchorScroll',function($scope,$http,$location,$anchorScroll){
		
	        $scope.newstorename='';
			$scope.newusername='';
			$scope.newemail='';
			$scope.newpassword='';

			$scope.main = {
					heading:'mySpaza',
					brief:'Manage your Spazashop from your PC or Cellphone'
			}

			$scope.loadCreate = function(){
				$scope.create=!$scope.create;
				console.log("clicked: "+$scope.create)
				if($scope.create){
					$location.hash('registration')
				}
				else{
					$location.hash('headr')
				}
				
			}


			

			$scope.createStore = function(){
					console.log('Create() initiated')
					var data = {username:$scope.newusername,storename:$scope.newstorename,email:$scope.newemail,password:$scope.newpassword}
					$http.post('http://172.18.0.108:8080/ang/users/add',data).then(function(response){
						console.log(response+ ' < - >Done posting');
					})
					$scope.next =true;
			}


}])

