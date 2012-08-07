define(function () {
    
	
	
	var AddTask = {
		
		checkboxes: [],
		_checkboxTimes: [5, 10, 15, 30, 45, 60, 61],
		selectMin: null,
		selectMax: null,
		
		/**
		 * Creates and adds a Task
		 */
		addTask: function addTask()
		{
			
		},
		
		/**
		 * Called when a checkbox is clicked
		 * 
		 * @param   {event}   event   DOM event
		 */
		_onCheckboxClick: function _onCheckboxClick(event)
		{
			var targetIndex = event.target.index;
			if(this.selectMin !== null && this.selectMin === this.selectMax && targetIndex > this.selectMax)
			{
				for(var i = this.selectMin, len = targetIndex; i <= len; ++i)
				{
					this.checkboxes[i][0].checked = true;
					this.checkboxes[i].checkboxradio("refresh");
					this.selectMax = targetIndex;
				}
			}
			else
			{
				for(var i = 0, len = this.checkboxes.length; i < len; ++i)
				{
					this.checkboxes[i][0].checked = (i === targetIndex);
					this.checkboxes[i].checkboxradio("refresh");
					
				}
				this.selectMin = this.selectMax = targetIndex;
			}
		}, 
		
		
		/**
		 * Called when the page is initialized
		 */
		_onPageInit: function _onPageInit()
		{
			for(var i = 0, len = this._checkboxTimes.length; i < len; ++i)
			{
				var cb = document.getElementById("addTask-cb-" + this._checkboxTimes[i]);
				cb.index = i;
				cb.time = this._checkboxTimes[i];
				$(cb).bind("click", AddTask._onCheckboxClick.bind(AddTask)); // TODO: find out what sucks here
				//cb.addEventListener("click", AddTask._onCheckboxClick.bind(AddTask));
				this.checkboxes.push($(cb));
			}
		},
		
		/**
		 * Called before a page is shown
		 */
		_onPageBeforeShow: function _onPageBeforeShow()
		{
		}, 
		
	
		/**
		 * Creates and adds a task and then changes view
		 */
		addTaskAndChangePage: function addTaskAndChangePage()
		{
			this.addTask();
			$.mobile.changePage("#startpage");
			
			// TODO: show notifications of successfull added task
		}, 
		
	};
	
	$("#page-addTask").bind("pageinit", AddTask._onPageInit.bind(AddTask));
	$("#page-addTask").bind("pagebeforeshow", AddTask._onPageBeforeShow.bind(AddTask));
	
	document.getElementById("page-addTask").addEventListener("pageinit", AddTask._onPageInit.bind(AddTask), true);

    return AddTask;
});