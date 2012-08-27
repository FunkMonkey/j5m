define(["TaskManager"], function(TaskManager) {
    
	var ShowTask = {
		
		
		/**
		 * Called when the page is initialized
		 */
		_onPageInit: function _onPageInit()
		{
			this.list = $(document.getElementById("showTask-taskList"));
			this.moreButton = $("#showTask-more")
		},
		
		/**
		 * Called before a page is shown
		 */
		_onPageBeforeShow: function _onPageBeforeShow()
		{
			this.lastTask = -1;
			this.tasks = TaskManager.getRandomTaskList(parseInt($.mobile.pageData.min), parseInt($.mobile.pageData.max));
			this.numShownTasks = parseInt($.mobile.pageData.numShownTasks);
			this.showMore();
		},
		
		lastTask: -1,
		
		/**
		 * Shows more tasks
		 */
		showMore: function showMore()
		{
			this.list.empty();
			
			if(this.tasks.length == 0)
			{
				var item = document.createElement("li");
				item.textContent = "Sorry, there is task for the given time range!"
				this.list[0].appendChild(item);
				this.moreButton.addClass('ui-disabled');
			}
			else
			{
				var range = this.lastTask + this.numShownTasks + 1;
			
				for(var i = this.lastTask + 1, len = this.tasks.length; i < len && i < range ; ++i)
				{
					var item = document.createElement("li");
					item.textContent = this.tasks[i].title;
					this.list[0].appendChild(item);
				}
				
				this.lastTask += this.numShownTasks;
				
				if(this.lastTask + 1 < this.tasks.length)
					this.moreButton.removeClass('ui-disabled');
				else
					this.moreButton.addClass('ui-disabled');
			}
			
			
			this.list.listview ("refresh", true)
		}, 
		
		
		/**
		 * Sets the state for the view (selection of tasks to show)
		 * 
		 * @param   {object}   state   State to set
		 */
		setState: function setState(state)
		{
			this.state = state;
		}, 
		
	};
	
	// TODO: use traditional DOM methods
	$("#page-showTask").bind("pageinit", ShowTask._onPageInit.bind(ShowTask));
	$("#page-showTask").bind("pagebeforeshow", ShowTask._onPageBeforeShow.bind(ShowTask));
	
    return ShowTask;
});