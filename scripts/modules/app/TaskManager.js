define(function () {
    
	/**
	 * 
	 *
	 * @constructor
	 */
	function Task(title, timeMin, timeMax, date, tags)
	{
		this.title = title;
		this.timeMin = timeMin;
		this.timeMax = timeMax;
		this.dateAdded = (date == null) ? new Date() : date;
		this.tags = (tags == null) ? [] : tags;
	}
	
	/**
	 * Creates a Task from a JSON object
	 * 
	 * @param   {object}   jsonObj   JSON source object
	 * 
	 * @returns {Task}   Created task
	 */
	Task.createFromJSON = function createFromJSON(jsonObj)
	{
		return new Task( jsonObj.title,
						 jsonObj.timeMin,
						 jsonObj.timeMax,
						 new Date(jsonObj.dateAdded),
						 jsonObj.tags)
	}, 
	
	
	Task.prototype = {
		/**
		 * Creates a JSON object from this task
		 * 
		 * @returns {object}   JSON object
		 */
		toJSON: function toJSON()
		{
			return {
				title: this.title,
				timeMin: this.timeMin,
				timeMax: this.timeMax,
				dateAdded: this.dateAdded.getTime(),
				tags: this.tags
			}
		}, 
		
	};
	
	Object.defineProperty(Task.prototype, "constructor", {value: Task});

	
	var TaskManager = {
		Task: Task,
		
		tasks: [],
		
		db: null,
		
		/**
		 * Initializes the TaskManager
		 */
		init: function init()
		{
			var self = this;
			
			this.db = new Lawnchair("tasks", function(){});
			this.db.each(function(obj, index){
					var task = self.Task.createFromJSON(obj);
					self.addTask(task);
				})
		}, 
		
		/**
		 * Adds a task
		 * 
		 * @param   {Task}   task   Task to add
		 */
		addTask: function addTask(task)
		{
			for (var i=0; i < this.tasks.length; i++) {
				if(this.tasks[i].title == task.title)
					throw new Error("Task with title '" + task.title + "' already exists!");
			}
			
			this.tasks.push(task);
			
			// saving the task to the DB
			var json = task.toJSON();
			task.key = task.title;
			this.db.save(task);
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
	
	
	TaskManager.init();
	
	
	// TODO: remove
	//TaskManager.addTask(new Task("Do some stuff", 5, 10));
	
    return TaskManager;
});