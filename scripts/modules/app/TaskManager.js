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
		Task: Task,
		
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
		
		/**
		 * Returns a random task
		 * 
		 * @returns {Task}   Random task
		 */
		getRandomTask: function getRandomTask()
		{
			return this.tasks[0]; // TODO: make random
		}, 
		
	};
	
	// TODO: remove
	TaskManager.addTask(new Task("Do some stuff", 5, 10));
	
    return TaskManager;
});