(function (window, $) {
	

	//methods
	
	function inheritPrototype(childObject, parentObject){
		var copyOfParent = Object.create(parentObject.prototype);
		copyOfParent.constructor = childObject;
		childObject.prototype = copyOfParent;
	}
	
	//obj
	
	function User(name){
		this.name = name;
		this.money = 1000;
		this.companies = [];
	}
	
	User.prototype = {
		constructor: User,
		createCompany: function(){
			this.companies.push(new Company("company inc", 1000));
		}
	}

	function Company(name, capital){
		this.name = name;
		this.capital = capital;
		this.workers = [];
		this.currentProjects = [];
		this.jobsQueue = [];
		this.releasedGames = [];
	}
	
	Company.prototype = {
		constructor: Company,
		developNewGame: function(){
			this.currentProjects.push(new Game("name1"));
		},
		createNewJob: function(){
			this.jobsQueue.push(new Project("name1", "game1", 100));
		}
	}
	
	function Worker(specialization, skill, age){
		this.name = chance.first + " " + chance.last;
		this.specialization = specialization;
		this.skill = skill;
		this.previousProjects = [];
		this.age = age;
		this.currentJob = "";
		this.avatar = "";
		
		this.level = 1;
		this.exp = 0;
		this.toNextLevel = 10;
	}
		
	Worker.prototype = {
		constructor: Worker,
		hire: function(){
			//hire
		},
		fire: function(){
			//fire
		},
		promote: function(){
			//promote
		},
		levelUp: function(){
			this.level ++;
			this.exp = 0;
		},
		checkForJobs: function(jobsQueue){
			if(this.currentJob == "")
				jobsQueue.forEach(function(job){
					
			});
		}
	}
	
	function Game(name){
		this.name = name;
	}
	
	Game.prototype = {
		constructor: Game,
		publish:function(){
			console.log("published");
		}
	}
	
	function Job(name, type, duration){
		this.name = name;
		this.type = type;
		this.duration = duration;
		this.progress = 0;
	}
	
	Job.prototype = {
		constructor: Job,
		progress: function(amount){
			this.progress += amount;
			if(this.progress >= this.duration){
				//finish method
			}
		}
	}
	
	$(document).ready(function(){
		
		var worldTick = setInterval(function(){
			
		}, 250);
		
	});

})(window, window.jQuery);