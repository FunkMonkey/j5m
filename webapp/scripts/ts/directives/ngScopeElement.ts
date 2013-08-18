module j5m {

	module directives {

		angular.module("j5m.directives.ngScopeElement", []).
			directive("ngScopeElement", function () {
				var directiveDefinitionObject = {

					restrict: "A",

					compile: function compile(tElement, tAttrs, transclude) {
						return {
								pre: function preLink(scope, iElement, iAttrs, controller) {
									scope[iAttrs.ngScopeElement] = iElement;
								}
							};
					}
				};

				return directiveDefinitionObject;
			});
	}
}