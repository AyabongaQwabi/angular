var spazaApp = angular.module('spazaApp',[])

spazaApp.directive('ngProducts',function(){

		return {
			restrict:'E',
			require:'items',
			scope:{
				items:'='
			},
			template:"<div class='items'>{{item[0]}}</div>"
		}
});

