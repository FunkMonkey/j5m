module j5m {

	module directives {

		angular.module("j5m.directives.ngScopeElement", []).
			directive("ngScopeElement", function () {
				var directiveDefinitionObject = {
					restrict: "A",

					link: function link(scope, iElement, iAttrs) {
						scope[iAttrs.ngScopeElement] = iElement;
					}
				};

				return directiveDefinitionObject;
			});
	}
}