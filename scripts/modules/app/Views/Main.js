define(["TaskManager", "Widgets/CheckboxRange", "Views/ShowTask"], function(TaskManager, CheckboxRange, ShowTask) {
    
	var Main = {
		
		_checkboxTimes: [5, 10, 15, 30, 45, 60, 61],
		
		/**
		 * Called when the page is initialized
		 */
		_onPageInit: function _onPageInit()
		{
			var container = document.getElementById("findTask-checkboxes");
			this.checkboxRange = container.checkboxRange  = new CheckboxRange(container, this._checkboxTimes);
		},
		
		/**
		 * Called before a page is shown
		 */
		_onPageBeforeShow: function _onPageBeforeShow()
		{
			this.checkboxRange.deselectAll();
		},
		
		// TODO: make options
		defaultMin: 5,
		defaultMax: 61,
		
		/**
		 * Shows tasks based on the given selection
		 */
		showTasks: function showTasks()
		{
			var min = this.checkboxRange.selectMin;
			var max = this.checkboxRange.selectMax;
			
			if(min == null)
			{
				min = 0;
				max = 6;
			}
			
			$.mobile.changePage("#page-showTask?min=" + this._checkboxTimes[min] + "&max=" + this._checkboxTimes[max] + "&numShownTasks=1");
			
		}, 
		
		
	};
	
	// TODO: use traditional DOM methods
	//$("#page-main").bind("pageinit", Main._onPageInit.bind(Main));
	$("#page-main").bind("pagebeforeshow", Main._onPageBeforeShow.bind(Main));
	
	// TODO: check if that really works out
	// as this module is loaded when DOM is ready, we can safely do this
	Main._onPageInit();
	Main._onPageBeforeShow();
	
    return Main;
});