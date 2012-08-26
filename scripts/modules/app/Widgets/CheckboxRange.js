define(function(){
    
	/**
	 * 
	 *
	 * @constructor
	 * 
	 */
	function CheckboxRange(container, data)
	{
		this.container = container;
		this.data = data;
		this.checkboxes = [];
		this.selectMin = null;
		this.selectMax = null;
		
		var childNodes = container.getElementsByTagName("input");
		
		for(var i = 0, len = childNodes.length; i < len; ++i)
		{
			var child = childNodes[i];
			if(child.getAttribute("type") === "checkbox")
				this.checkboxes.push($(child));
		}
		
		if(data.length !== this.checkboxes.length)
			throw new Error("Wrong number of checkboxes");
		
		for(var i = 0, len = data.length; i < len; ++i)
		{
			var cb = this.checkboxes[i][0];
			cb.index = i;
			cb._data = data[i];
			$(cb).bind("click", this._onCheckboxClick.bind(this)); // TODO: find out what sucks here
			//cb.addEventListener("click", AddTask._onCheckboxClick.bind(AddTask));
		}
	}
	
	CheckboxRange.prototype = {
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
		 * Selects from index "from" to index "to"
		 * 
		 * @param   {Number}   from   
		 * @param   {Number}   to     
		 */
		selectFromTo: function selectFromTo(from, to)
		{
			if(to < from)
				throw new Error("To < from");
			
			for(var i = 0, len = this.checkboxes.length; i < len; ++i)
			{
				this.checkboxes[i][0].checked = (i >= from && i <= to) ? true : false;
				this.checkboxes[i].checkboxradio("refresh");
				this.selectMin = null;
				this.selectMax = null;
			}
			
			this.selectMin = from;
			this.selectMax = to;
		}, 
		
		
		/**
		 * Deselects all checkboxes
		 */
		deselectAll: function deselectAll()
		{
			for(var i = 0, len = this.checkboxes.length; i < len; ++i)
			{
				this.checkboxes[i][0].checked = false;
				this.checkboxes[i].checkboxradio("refresh");
			}
			
			this.selectMin = null;
			this.selectMax = null;
		}, 
		
	};
	
	Object.defineProperty(CheckboxRange.prototype, "constructor", {value: CheckboxRange});
	
    return CheckboxRange;
});