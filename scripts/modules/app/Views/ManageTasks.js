define(["TaskManager",
		"Utils/DOMUtils"], function(TaskManager, DOMUtils) {
    
	var ManageTasks = {
		
		
		/**
		 * Called when the page is initialized
		 */
		_onPageInit: function _onPageInit()
		{
			this.list = $(document.getElementById("manageTasks-taskList"));
		},
		
		/**
		 * Called before a page is shown
		 */
		_onPageBeforeShow: function _onPageBeforeShow()
		{
			this.showTasks();
		},
		
		/**
		 * Called when an item was clicked
		 * 
		 * @param   {event}   event   Description
		 */
		onItemClick: function onItemClick(event)
		{
			
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
				                       '<a anonid="manageTasks-editButton" class="manageTasks-editButton" href="index.html" data-role="button" data-theme="none" data-corners="false" data-shadow="false" data-icon="gear" data-inline="true" data-iconpos="notext"></a>' + 
				                       '<a anonid="manageTasks-deleteButton" class="manageTasks-deleteButton" href="index.html" data-role="button" data-theme="none" data-corners="false" data-shadow="false" data-icon="delete" data-inline="true" data-iconpos="notext"></a>' + 
								   '</div>' +
								 '</div>' +
								'</li>';
				
				var item = this.list.append(itemCode);
				item.trigger("create");
				
				
				item.task = task;
			}
			
			this.list.listview("refresh");
		}, 
		
	};
	
	// TODO: use traditional DOM methods
	$("#page-manageTasks").bind("pageinit", ManageTasks._onPageInit.bind(ManageTasks));
	$("#page-manageTasks").bind("pagebeforeshow", ManageTasks._onPageBeforeShow.bind(ManageTasks));
	
    return ManageTasks;
});