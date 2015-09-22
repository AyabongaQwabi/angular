var app = angular.module('spazaApp',[])

app.directive('ngProducts',function(){

		return {
			restrict:'E',
			require:'items',
			scope:{
				items:'='
			},
			template:"<div class='items'>{{item[0]}}</div>"
		}
});

app.directive('ngSparkline', function() {
  return {
    restrict: 'A',
    require: '^ngModel',
    template: '<div class="sparkline"><h4>Weather for {{ngModel}}</h4></div>'
  }
});