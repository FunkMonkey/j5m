define(["Widgets/CheckboxRange"], function(CheckboxRange) {
    
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