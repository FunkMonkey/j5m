/// <reference path="../ts_definitions/angularjs/angular.d.ts" /> 
/// <reference path="../ts_definitions/lawnchair.d.ts" />
 


module j5m {

	export module services {
		var $q: ng.IQService = null;
		function initInjects(q: ng.IQService) { $q = q; }

		angular.module('j5m.services', [])
			.factory('TaskManager', function($q: ng.IQService): TaskManager {
				initInjects($q);
				return new TaskManager();
			});


		// ===============================================

		export interface ITaskJSON {
			id: string;
			title: string;
			timeMin: number;
			timeMax: number;
			dateAdded: number;
			tags: string[];
		}

		/**
		 * 
		 *
		 * @constructor
		 */
		export class Task {

			id: string;
			title: string;
			timeMin: number;
			timeMax: number;
			dateAdded: Date;
			tags: string[];

			constructor(id: string, title: string, timeMin: number, timeMax: number, date?: Date, tags?: string[]){
				this.id = id;
				this.title = title;
				this.timeMin = timeMin;
				this.timeMax = timeMax;
				this.dateAdded = (date == null) ? new Date() : date;

				if(tags == null)
					this.tags = [];
				else
					this.tags = tags;
			}

			/**
			 * Creates a Task from a JSON object
			 * 
			 * @param   {object}   jsonObj   JSON source object
			 * 
			 * @returns {Task}   Created task
			 */
			static createFromJSON(jsonObj: ITaskJSON): Task
			{
				return new Task( jsonObj.id,
								 jsonObj.title,
								 jsonObj.timeMin,
								 jsonObj.timeMax,
								 new Date(jsonObj.dateAdded),
								 jsonObj.tags)
			}
			
			
			toJSON(): ITaskJSON
			{
				return {
					id: this.id,
					title: this.title,
					timeMin: this.timeMin,
					timeMax: this.timeMax,
					dateAdded: this.dateAdded.getTime(),
					tags: this.tags
				}
			}
		}

		export interface ITaskConstructor {
			new(id: string, title: string, timeMin: number, timeMax: number, date?: Date, tags?: string[]): Task;
			createFromJSON(jsonObj: ITaskJSON): Task;
		}


		export class TaskManager {
			Task: ITaskConstructor;
			tasks: Task[];

			db: Lawnchair;
			
			options: any;

			constructor() {
				this.Task = Task;
				this.options = {
					maxID: 0,
				};
			}
			

			/**
			 * Initializes the TaskManager
			 */
			init() {
				var self = this;

				var defer = $q.defer();
				
				this.db = new Lawnchair({name: "tasks", adapter: "dom"}, function(){});
				this.db.each(function(obj, index){
					
						// duck-type-checking whether it is the options object
					    if(obj.maxID)
							self.options = obj;
						else {
							var task = self.Task.createFromJSON(obj);
							self.tasks.push(task);
						}
					})
			}
			
			/**
			 * Adds a task
			 * 
			 * @param   {Task}   task   Task to add
			 */
			addTask(title, timeMin, timeMax, date, tags) {
				var task = new Task(this.options.maxID + 1, title, timeMin, timeMax, date, tags)
				
				this.options.maxID++;
				this.options.key = "options";
				this.db.save(this.options);
				
				this.tasks.push(task);
				
				// saving the task to the DB
				this.saveTask(task);
			}
			
			/**
			 * Adds a task
			 * 
			 * @param   {Task}   task   Task to add
			 */
			addTask2(task, title, timeMin, timeMax, date, tags) {
				task.title = title;
				task.timeMin = timeMin;
				task.timeMax = timeMax;
				task.tags = tags;
				
				this.options.maxID++;
				this.options.key = "options";
				this.db.save(this.options);
				
				// saving the task to the DB
				this.saveTask(task);
			}
			
			/**
			 * Saves the given task to the DB
			 * 
			 * @param   {Task}   task   Task to save
			 */
			saveTask(task) {
				var json = task.toJSON();
				json.key = json.id;
				this.db.save(json);
			}
			
			
			/**
			 * Removes the given task from the manager
			 * 
			 * @param   {Task}   task   Task to remove
			 */
			removeTask(task) {
				for(var i = 0, len = this.tasks.length; i < len; ++i)
				{
					if(this.tasks[i] === task)
					{
						this.tasks.splice(i, 1);
						this.db.remove(task.id);
						break;
					}
				}
			}
			
			
			/**
			 * Returns a random task
			 * 
			 * @returns {Task}   Random task
			 */
			getRandomTask() {
				return this.tasks[0]; // TODO: make random
			}
			
			/**
			 * Returns a task by the given id
			 * 
			 * @param   {Number}   id   ID to search for
			 * 
			 * @returns {Task}   Return task
			 */
			getTaskByID(id) {
				for(var i = 0, len = this.tasks.length; i < len; ++i)
				{
					if(this.tasks[i].id === id)
					{
						return this.tasks[i];
					}
				}
				
				return null;
			}
			
			
			shuffleArray(array) {
				var tmp, current, top = array.length;
				
				if(top) while(--top) {
					current = Math.floor(Math.random() * (top + 1));
					tmp = array[current];
					array[current] = array[top];
					array[top] = tmp;
				}
				
				return array;
			}
			
			/**
			 * Returns a list of random tasks
			 *
			 * @param   {Number}   min   Minimum time
			 * @param   {Number}   max   Maximum time
			 * 
			 * @returns {Task[]}   List of tasks
			 */
			getRandomTaskList(min, max) {
				var tmpArray = []
				for(var i = 0, len = this.tasks.length; i < len; ++i)
				{
					var task = this.tasks[i];
					if(!(min > task.timeMax || max < task.timeMin))
						tmpArray.push(this.tasks[i]);
				}
					
				this.shuffleArray(tmpArray)
				
				return tmpArray;
			}
		};

	}	
}


