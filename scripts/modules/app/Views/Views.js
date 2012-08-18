define(["Views/Main",
		"Views/AddTask",
		"Views/ShowTask",
		"Views/ManageTasks"],
	   function(Main, AddTask, ShowTask, ManageTasks) {
    
	var Views = {
		Main: Main,
		AddTask: AddTask,
		ShowTask: ShowTask,
		ManageTasks: ManageTasks
	};

    return Views;
});