/// <reference path="../ts_definitions/angularjs/angular.d.ts" /> 
/// <reference path="TaskManager.ts" /> 

module j5m {

	angular.module("j5m.directives", ["j5m.directives.ValueRangeChooser", "j5m.directives.ngScopeElement"]);
	 
	angular.module("j5m.filters", []);
	 
	angular.module("j5m", ["j5m.services", "j5m.filters", "j5m.directives", "pascalprecht.translate"]).
		config(function($translateProvider: any) {
			// This is effectively part of the main method initialization code
			$translateProvider.translations("en_EN", {
				"HEADER": "just 5 mintes",
				"ADD_TASK": "Add Task"
			});

			$translateProvider.preferredLanguage("en_EN");
		}).
		controller("Main", function($scope, TaskManager: services.TaskManager){
			$scope.currentPage = "Start";
			$scope.times = [5, 10, 15, 30, 45, { value: 61, label: ">60"}];
			$scope.timeMin = 10;
			$scope.timeMax = 30;
			$scope.changePage = function() {
				$scope.currentPage = "Tasks"; 
			}
		}).
		controller("Start", function($scope, TaskManager: services.TaskManager){

		});
}