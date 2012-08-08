define(["TaskManager"], function(TaskManager) {
    
	var ShowTask = {
		
		
		/**
		 * Called when the page is initialized
		 */
		_onPageInit: function _onPageInit()
		{
			this.list = $(document.getElementById("showTask-taskList"));
		},
		
		/**
		 * Called before a page is shown
		 */
		_onPageBeforeShow: function _onPageBeforeShow()
		{
			this.list.empty();
			var item = document.createElement("li");
			item.textContent = TaskManager.getRandomTask().title;
			this.list[0].appendChild(item);
			this.list.listview ("refresh")
		}, 
		
	};
	
	// TODO: use traditional DOM methods
	$("#page-showTask").bind("pageinit", ShowTask._onPageInit.bind(ShowTask));
	$("#page-showTask").bind("pagebeforeshow", ShowTask._onPageBeforeShow.bind(ShowTask));
	
    return ShowTask;
});