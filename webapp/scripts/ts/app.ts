/*class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>" + this.greeting + "</h1>";
    }
};
var greeter = new Greeter("Hello, world!");
var str = greeter.greet();
document.body.innerHTML = str;  */

/// <reference path="../ts_definitions/angularjs/angular.d.ts" /> 
/// <reference path="TaskManager.ts" /> 

module j5m {

	angular.module('j5m.directives', []);
	 
	angular.module('j5m.filters', []);
	 
	angular.module('j5m', ['j5m.services', 'j5m.directives', 'j5m.filters', 'pascalprecht.translate']).
		config(function($translateProvider: any) {
			// This is effectively part of the main method initialization code
			$translateProvider.translations('en_EN', {
				"HEADER": "just 5 mintes",
				"ADD_TASK": "Add Task"
			});

			$translateProvider.preferredLanguage('en_EN');
		}).
		controller("Main", function($scope, TaskManager: services.TaskManager){
			$scope.currentPage = "Start";
			$scope.changePage = function() {
				$scope.currentPage = "Tasks"; 
			}
		}).
		controller("Start", function($scope, TaskManager: services.TaskManager){

		});
}
