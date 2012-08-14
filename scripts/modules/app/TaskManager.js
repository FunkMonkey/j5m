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
			
			this.db = new Lawnchair({name: "tasks", adapter: "dom"}, function(){});
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
		
		shuffleArray: function shuffleArray(array) {
			var tmp, current, top = array.length;
			
			if(top) while(--top) {
				current = Math.floor(Math.random() * (top + 1));
				tmp = array[current];
				array[current] = array[top];
				array[top] = tmp;
			}
			
			return array;
		},
		
		/**
		 * Returns a list of random tasks
		 *
		 * @param   {Number}   min   Minimum time
		 * @param   {Number}   max   Maximum time
		 * 
		 * @returns {Task[]}   List of tasks
		 */
		getRandomTaskList: function getRandomTaskList(min, max)
		{
			var tmpArray = []
			for(var i = 0, len = this.tasks.length; i < len; ++i)
			{
				var task = this.tasks[i];
				if(!(min > task.timeMax || max < task.timeMin))
					tmpArray.push(this.tasks[i]);
			}
				
			this.shuffleArray(tmpArray)
			
			return tmpArray;
		}, 
		
		
	};
	
	
	TaskManager.init();
	
	
	// TODO: remove
	//TaskManager.addTask(new Task("Do some stuff", 5, 10));
	
    return TaskManager;
});