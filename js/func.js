(function (window, $) {
	

	//methods
	
	function inheritPrototype(childObject, parentObject){
		var copyOfParent = Object.create(parentObject.prototype);
		copyOfParent.constructor = childObject;
		childObject.prototype = copyOfParent;
	}
	
	//obj
	
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
		addExp: function(amount){
			if(this.exp + amount <= this.toNextLevel)
				this.exp += amount;
			else
				while(this.exp + amount > this.toNextLevel){
					amount -= (this.toNextLevel - this.exp);
					this.levelUp();
				}
		},
		levelUp: function(){
			this.level ++;
			this.toNextLevel *= 1.3;
		},
		checkForJobs: function(jobsQueue){
			if(this.currentJob == "")
				jobsQueue.forEach(function(job, index, obj){
					//if it meets requirements
					this.currentJob = job;
					obj.splice(index, 1);
				});
		}
	}
	
	function User(fname, lname){
		Worker.call(this, "playerchar", 100, 16);
		this.first = fname;
		this.last = lname;
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
			this.currentProjects.push(new Game("name1", this));
		},
		hire: function(worker){
			//hire
		},
		fire: function(worker){
			//fire
		},
		promote: function(worker){
			//promote
		}
	}
	
	function Game(name, company){
		this.name = name;
		this.sellingPrice = 10;
		this.baseDuration = 3;
		this.neededJobs = [
			{
				type: "Code",
				amount: 1,
				reward: 10
			}, {
			    type: "Art",
				amount: 1,
				reward: 10
			}, {
			    type: "Sound",
				amount: 1,
				reward: 10
			}
		];
		this.parentCompany = company;
		
	}
	
	Game.prototype = {
		constructor: Game,
		generateJobs: function(){
			this.neededJobs.forEach(function(current, index, arr){
				while(current.amount){
					this.parentCompany.jobsQueue.push(new Job("name", current.type, this.baseDuration, current.reward));
				}
			});
		},
		publish:function(){
			console.log("published");
		}
	}
	
	function Job(name, type, duration, reward){
		this.name = name;
		this.type = type;
		this.duration = duration;
		this.progress = 0;
		this.contrib = [];
		this.reward = reward;
	}
	
	Job.prototype = {
		constructor: Job,
		progress: function(amount){
			this.progress += amount;
			if(this.progress >= this.duration){
				this.contrib.forEach(function(contrib, index, arr){
					contrib.currentJob = "";
					contrib.addExp(this.reward);
				});
			}
		}
	}
	
	$(document).ready(function(){
		
		var pp = new User("Top", "Kek");
		
		var worldTick = setInterval(function(){
			
		}, 250);
		
	});

})(window, window.jQuery);