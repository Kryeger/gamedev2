(function (window, $) {
	
	var user = new User("Kry", "Eger");
	
	//methods
	
	function hey(diff = ""){
		console.log("hey" + diff);
	}
	
	function inheritPrototype(childObject, parentObject){
		var copyOfParent = Object.create(parentObject.prototype);
		copyOfParent.constructor = childObject;
		childObject.prototype = copyOfParent;
	}
	
	//obj
	
	function Worker(specialization, skill, salary, hiringFee){
		this.fname = chance.first();
		this.lname = chance.last();
		this.name = this.fname + " " + this.lname;
		this.specialization = specialization;
		this.skill = skill;
		this.previousProjects = [];
		this.age = chance.integer({min: 18, max: 60});
		this.currentJob = "";
		this.avatar = "";
		this.salary = salary;
		this.hiringFee = hiringFee;
		this.company = "none";
		this.gender = chance.gender();

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
		checkForJobs: function(){
			if(this.currentJob == "")
				this.company.jobsQueue.some(function(current, index, arr){
					//if it meets requirements
					this.currentJob = current;
					current.contrib.push(this);
					return 1;
				}, this);
		}
	}
	
	function User(fname, lname){
		Worker.call(this, "playerchar", 100, 16, 0);
		
		this.fname = fname;
		this.lname = lname;
		this.name = fname + " " + lname;
		
		this.money = 1000;
		this.companies = [];
		this.mainCompany = "";
	}
	
	User.prototype = {
		constructor: User,
		createCompany: function(){
			this.companies.push(new Company("company inc", 1000));
			if(this.companies.length == 1){
				this.mainCompany = _.first(this.companies);
			}
		},
		selectMainCompany: function(company){
			this.mainCompany = company;
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
			(_.last(this.currentProjects)).parentCompany = this;
			(_.last(this.currentProjects)).generateJobs();
		},
		distribJobs: function(){
			this.workers.forEach(function(current, index, arr){
				current.checkForJobs();
			});
		},
		workJobs: function(){
			this.workers.forEach(function(current, index, arr){
				if(current.currentJob != ""){
					current.currentJob.makeProgress(chance.integer({min: 1, max: 3}));
				}
			});
		},
		hire: function(worker){
			this.workers.push(worker);
			worker.company = this;
			this.capital -= worker.hiringFee;
		},
		fire: function(worker){
			this.workers.remove(function(el) {return _.isEqual(el, worker);});
		},
		promote: function(worker){
			//promote
		}
	}
	
	function Game(name){
		this.name = name;
		this.sellingPrice = 10;
		this.baseDuration = 10;
		this.neededJobs = [
			{
				type: "Code",
				amount: 1,
				reward: 10,
				duration: this.baseDuration,
				progress: 0
			}, {
			    type: "Art",
				amount: 1,
				reward: 10,
				duration: this.baseDuration,
				progress: 0
			}, {
			    type: "Sound",
				amount: 1,
				reward: 10,
				duration: this.baseDuration,
				progress: 0
			}
		];
		this.parentCompany = "none";
		
	}
	
	Game.prototype = {
		constructor: Game,
		generateJobs: function(){
			this.neededJobs.forEach(function(current, index, arr){
				while(current.amount){
					this.parentCompany.jobsQueue.push(new Job("jobname", current.type, current.baseDuration, current.reward));
					current.amount --;
				}
			}, this);
		},
		calcProgress:function(){
			this.neededJobs.forEach(function(current, index, arr){
				
			}, this);
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
		makeProgress: function(amount){
			this.progress += amount;
			if(this.progress >= this.duration){
				this.contrib.forEach(function(current, index, arr){
					current.currentJob = "";
					current.addExp(this.reward);
					current.previousProjects.push(this);
				}, this);
			}
		}
	}
	
	$(document).ready(function(){
		
		user.createCompany();
		user.mainCompany.developNewGame("game1");
		user.mainCompany.hire(new Worker("coder", 1, 1, 1));
		
		
		$(document).on("click", ".ls-mi-icon", function(){
			user.mainCompany.distribJobs();
			user.mainCompany.workJobs();
			console.log(user.mainCompany);
		});
//		var worldTick = setInterval(function(){
//			
//			user.mainCompany.distribJobs();
//			
//			user.companies.forEach(function(current, index, arr){
//				current.workJobs();
//			});
//			
//		}, 250);
		
	});

})(window, window.jQuery);