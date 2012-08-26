define(["TaskManager",
		"Utils/DOMUtils"], function(TaskManager, DOMUtils) {
    
	var ManageTasks = {
		
		
		/**
		 * Called when the page is initialized
		 */
		_onPageInit: function _onPageInit()
		{
			this.list = $(document.getElementById("manageTasks-taskList"));
			this.list[0].addEventListener("click", this.onListClick.bind(this));
		},
		
		/**
		 * Called before a page is shown
		 */
		_onPageBeforeShow: function _onPageBeforeShow()
		{
			this.showTasks();
		},
		
		/**
		 * Called when the list was clicked
		 * 
		 * @param   {event}   event   Description
		 */
		onListClick: function onListClick(event)
		{
			var target = event.target;
			var task = null;
			var anonid = null;
			
			while(target !== this.list[0])
			{
				var currAnonid = target.getAttribute("anonid");
				if(currAnonid === "manageTasks-editButton" || currAnonid === "manageTasks-deleteButton") {
					anonid = currAnonid;
				}
				
				if(target.task) {
					task = target.task;
					break;
				}
				
				target = target.parentNode;
			}
			
			if(anonid && task)
			{
				if(anonid === "manageTasks-editButton")
					this.editTask(task);
				else
					this.deleteTask(task, target);
			}
		},
		
		/**
		 * Edits the given task - opens edit page
		 * 
		 * @param   {Task}   task   Task to edit
		 */
		editTask: function editTask(task)
		{
			$.mobile.changePage("#page-addOrEditTask?mode=edit&taskID=" + task.id);
		},
		
		/**
		 * Deletes the given task
		 * 
		 * @param   {Task}      task       Task to delete
		 * @param   {element}   listitem   Listitem of the according task
		 */
		deleteTask: function deleteTask(task, listitem)
		{
			var self = this;
			
			// working around a simplelist bug
			this.currTask = task;
			this.currListitem = listitem;
			
			this.list.simpledialog2({
				mode: 'button',
				headerText: 'Delete task?',
				headerClose: true,
				buttonPrompt: 'Do you really want to delete the task?',
				buttons : {
				  'Yes, do it': {
					click: function () { 
						TaskManager.removeTask(self.currTask);
						$(self.currListitem).remove();
					}
				  },
				  'Cancel': {
					click: function () { 
					},
					icon: "delete",
					theme: "c"
				  }
				}
			})
		}, 
		
		
		
		
		/**
		 * Shows all the tasks
		 */
		showTasks: function showTasks()
		{
			this.list.empty();
			
			for(var i = 0, len = TaskManager.tasks.length; i < len; ++i)
			{
				var task = TaskManager.tasks[i];
				
				
				var itemCode = '<li>' +
				                 '<div class="ui-grid-a">' +
								   '<div class="ui-block-a" style="width:70%">' + task.title + '</div>' +
								   '<div class="ui-block-b" style="width:30%; text-align:right;" >' + 
				                       '<a anonid="manageTasks-editButton" class="manageTasks-editButton" data-role="button" data-theme="none" data-corners="false" data-shadow="false" data-icon="gear" data-inline="true" data-iconpos="notext"></a>' + 
				                       '<a anonid="manageTasks-deleteButton" class="manageTasks-deleteButton" data-role="button" data-theme="none" data-corners="false" data-shadow="false" data-icon="delete" data-inline="true" data-iconpos="notext"></a>' + 
								   '</div>' +
								 '</div>' +
								'</li>';
				
				var item = $(itemCode).appendTo(this.list);
				item.trigger("create");
				
				item[0].task = task;
			}
			
			this.list.listview("refresh");
		}, 
		
	};
	
	// TODO: use traditional DOM methods
	$("#page-manageTasks").bind("pageinit", ManageTasks._onPageInit.bind(ManageTasks));
	$("#page-manageTasks").bind("pagebeforeshow", ManageTasks._onPageBeforeShow.bind(ManageTasks));
	
    return ManageTasks;
});