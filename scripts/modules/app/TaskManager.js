define(function () {
    
	/**
	 * 
	 *
	 * @constructor
	 */
	function Task(title, timeMin, timeMax, date)
	{
		this.title = title;
		this.timeMin = timeMin;
		this.timeMax = timeMax;
		this.dateAdded = (date == null) ? new Date() : date;
	}
	
	Task.prototype = {
		
	};
	
	Object.defineProperty(Task.prototype, "constructor", {value: Task});
	
	var TaskManager = {
		tasks: [],
		
		/**
		 * Adds a task
		 * 
		 * @param   {Task}   task   Task to add
		 */
		addTask: function addTask(task)
		{
			this.tasks.push(task);
		},
	};
	
	

    return {
        TaskManager: TaskManager,
        Task: Task
    }
});