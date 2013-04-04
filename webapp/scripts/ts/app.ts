/*class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
};
var greeter = new Greeter("Hello, world!");
var str = greeter.greet();
document.body.innerHTML = str;  */

/// <reference path="../../libs/ts_definitions/angularjs/angular.d.ts" />
angular.module('j5m.service', []);
 
angular.module('j5m.directives', []);
 
angular.module('j5m.filters', []);
 
angular.module('j5m', ['j5m.service', 'j5m.directives', 'j5m.filters']).
	run(function() {
		// This is effectively part of the main method initialization code
	}).
	controller("MainCtrl", function($scope){
		$scope.currentPage = 2;
		$scope.changePage = function()
		{
			$scope.currentPage = 1; 
		}
	});