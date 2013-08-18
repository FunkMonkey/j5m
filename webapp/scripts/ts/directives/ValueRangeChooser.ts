module j5m {

	module directives {

		class ValueRangeChooser {


		}

		angular.module("j5m.directives.ValueRangeChooser", ["j5m.directives.ngScopeElement"]).
			directive("valuerangechooser", function () {
				var directiveDefinitionObject = {

					template: [	"<div class='vrc-value-labels' ng-scope-element='labels'>",
									"<div ng-repeat='value in values' class='vrc-value-label'>",
										"{{value.label}}",
									"</div>",
								"</div>",
								"<div class='vrc-value-lower'></div>",
								"<div class='vrc-bar'>",
									"<div class='vrc-marker-lower' ng-scope-element='markerLower'></div>",
									"<div class='vrc-marker-bar' ng-scope-element='markerBar'></div>",
									"<div class='vrc-marker-upper' ng-scope-element='markerUpper'></div>",
								"</div>",
								"<div class='vrc-value-upper'></div>"]
								.join(""),

					restrict: "E",

					scope: {
							values: "=values",
							valueLower: "=valueLower",
							valueUpper: "=valueUpper",
						},

					compile: function compile(tElement, tAttrs) {
						return function postLink(scope, iElement, iAttrs) {
							console.log(scope);
							scope.markerUpper[0].style.right = "70px";
							console.log(scope.valueLower)
							scope.values = scope.values.map( (val) => (typeof val == "number") 
																			? { value: val, label: "" + val }
																			: val);
							console.log(scope.labels.children()[0])
						}
					}
				};
				return directiveDefinitionObject;
			});
	}
}