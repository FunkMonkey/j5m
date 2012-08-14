define(["TaskManager", "Widgets/CheckboxRange"], function(TaskManager, CheckboxRange) {
    
	
	
	var AddTask = {
		
		_checkboxTimes: [5, 10, 15, 30, 45, 60, 61],
		
		/**
		 * Creates and adds a Task
		 */
		addTask: function addTask()
		{
			var title = this.taskTitle.value;
			if(!title)
			{
				alert("Please enter a title"); // TODO: make better;
				return false;
			}
			
			if(this.checkboxRange.selectMin === null)
			{
				alert("Please select a time-range"); // TODO: make better;
				return false;
			}
			
			var checkboxes = this.checkboxRange.checkboxes;
			var task = new TaskManager.Task(title, checkboxes[this.checkboxRange.selectMin][0]._data, checkboxes[this.checkboxRange.selectMax][0]._data);
			
			try {
				TaskManager.addTask(task);
			} catch (e) {
				alert("There is already a task with the title '" + task.title + "'");
				return false;
			}
			
			return true;
		},
		
		
		/**
		 * Called when the page is initialized
		 */
		_onPageInit: function _onPageInit()
		{
			var container = document.getElementById("addTask-checkboxes");
			this.checkboxRange = container.checkboxRange = new CheckboxRange(container, this._checkboxTimes);
			
			this.taskTitle = document.getElementById("task-title");
		},
		
		/**
		 * Called before a page is shown
		 */
		_onPageBeforeShow: function _onPageBeforeShow()
		{
			this.taskTitle.value = "";
			this.checkboxRange.deselectAll();
		}, 
		
	
		/**
		 * Creates and adds a task and then changes view
		 */
		addTaskAndChangePage: function addTaskAndChangePage()
		{
			if(this.addTask())
				$.mobile.changePage("#page-main");
			
			// TODO: show notifications of successfull added task
		}, 
		
	};
	
	// TODO: use traditional DOM methods
	$("#page-addTask").bind("pageinit", AddTask._onPageInit.bind(AddTask));
	$("#page-addTask").bind("pagebeforeshow", AddTask._onPageBeforeShow.bind(AddTask));

    return AddTask;
});