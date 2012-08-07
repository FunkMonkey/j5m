requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'scripts/modules/app',
    
	//except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        libs: '../libs'
    }
});

$(document).ready(function() {
   // Start the main app logic.
	requirejs(["TaskManager", "Views/Views"],
	function(TaskManagerModule, Views) {
		
		$.mobile.defaultPageTransition = "none";
		$.mobile.defaultDialogTransition = 'none'; 
		
		window.app = {};
		window.app.TaskManager = TaskManagerModule.TaskManager;
		window.app.Task = TaskManagerModule.Task;
		window.app.Views = Views;
	});
});

