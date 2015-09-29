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

			$scope.createTables =function(data){
				console.log('creating tables')
				$http.post('http://localhost:5000/ang/users/add/init',data)
					.then(function(response){
						console.log('done')

			         })
			}
			

			$scope.createStore = function(){
					console.log('Create() initiated')
					var data = {username:$scope.newusername,storename:$scope.newstorename,email:$scope.newemail,password:$scope.newpassword}
					console.log('Psoting new store')
					console.log(data)
					console.log('<---------->')
					$http.post('http://localhost:5000/ang/users/add',data).success(function(response){
						console.log(response+ ' < - >Done posting');
						$scope.createTables(data);
					})
					$scope.next =true;
			}


}])

