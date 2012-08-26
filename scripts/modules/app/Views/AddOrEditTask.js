define(["TaskManager", "Widgets/CheckboxRange"], function(TaskManager, CheckboxRange) {
    
	var AddOrEditTask = {
		
		_checkboxTimes: [5, 10, 15, 30, 45, 60, 61],
		
		currentTask: null,
		
		
		
		
		/**
		 * Called when the page is initialized
		 */
		_onPageInit: function _onPageInit()
		{
			var container = document.getElementById("addOrEditTask-checkboxes");
			this.checkboxRange = container.checkboxRange = new CheckboxRange(container, this._checkboxTimes);
			
			this.taskTitle = document.getElementById("addOrEditTask-taskTitle"); 
			this.submitButtonText = $("#addOrEditTask-submit .ui-btn-text");
			
			console.log("init")
		},
		
		/**
		 * Called before a page is shown
		 */
		_onPageBeforeShow: function _onPageBeforeShow(obj, data)
		{
			this.prevPage = "#" + data.prevPage.attr("id")
			
			var pageData = $.mobile.pageData;
			if(pageData.mode === "edit")
			{
				this.submitButtonText.text("save");
				
				this.currentTask = TaskManager.getTaskByID(parseInt(pageData.taskID));
				this.taskTitle.value = this.currentTask.title;
				
				this.checkboxRange.selectFromTo(this._checkboxTimes.indexOf(this.currentTask.timeMin), this._checkboxTimes.indexOf(this.currentTask.timeMax));
			}
			else // add
			{
				this.submitButtonText.text("Add task");
				
				this.taskTitle.value = "";
				this.checkboxRange.deselectAll();
			}
			
			
		},
		
		/**
		 * Cancels the operation and goes back to the previous screen
		 */
		cancel: function cancel()
		{
			$.mobile.changePage(this.prevPage);
		}, 
		
		
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
			
			if($.mobile.pageData.mode === "add") {
				TaskManager.addTask(title, checkboxes[this.checkboxRange.selectMin][0]._data, checkboxes[this.checkboxRange.selectMax][0]._data);
			} else {
				TaskManager.editTask(this.currentTask, title, checkboxes[this.checkboxRange.selectMin][0]._data, checkboxes[this.checkboxRange.selectMax][0]._data)
			}
			
			
			return true;
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
	
	// TODO: cancel should go to last page
	// TODO: use traditional DOM methods
	$("#page-addOrEditTask").bind("pageinit", AddOrEditTask._onPageInit.bind(AddOrEditTask));
	$("#page-addOrEditTask").bind("pagebeforeshow", AddOrEditTask._onPageBeforeShow.bind(AddOrEditTask));

    return AddOrEditTask;
});