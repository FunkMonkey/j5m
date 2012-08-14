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
			this.showMore();
		},
		
		/**
		 * Shows more tasks
		 */
		showMore: function showMore()
		{
			this.list.empty();
			
			if(this.state.tasks.length == 0)
			{
				var item = document.createElement("li");
				item.textContent = "Sorry, there is task for the given time range!"
				this.list[0].appendChild(item);
				this.moreButton.addClass('ui-disabled');
			}
			else
			{
				var range = this.state.lastTask + this.state.numShownTasks + 1;
			
				for(var i = this.state.lastTask + 1, len = this.state.tasks.length; i < len && i < range ; ++i)
				{
					var item = document.createElement("li");
					item.textContent = this.state.tasks[i].title;
					this.list[0].appendChild(item);
				}
				
				this.state.lastTask += this.state.numShownTasks;
				
				if(this.state.lastTask + 1 < this.state.tasks.length)
					this.moreButton.removeClass('ui-disabled');
				else
					this.moreButton.addClass('ui-disabled');
			}
			
			
			this.list.listview ("refresh")
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