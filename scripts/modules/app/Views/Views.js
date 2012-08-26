define(["Views/Main",
		"Views/AddOrEditTask",
		"Views/ShowTask",
		"Views/ManageTasks"],
	   function(Main, AddOrEditTask, ShowTask, ManageTasks) {
    
	var Views = {
		Main: Main,
		AddOrEditTask: AddOrEditTask,
		ShowTask: ShowTask,
		ManageTasks: ManageTasks
	};
	
	// setting page data
	$(document).bind("pagebeforechange", function( event, data ) {
		$.mobile.pageData = (data && data.options && data.options.pageData)
							   ? data.options.pageData
							   : null;
	 });


    return Views;
});