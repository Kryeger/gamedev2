//methods

function hey(diff = ""){
	console.log("hey" + diff);
}

function percent(num1, num2){
	return (num1 / num2) * 100;
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
	getJob: function(){
		this.company.currentProjects.some(function(current, index, arr){
			var exit = 0;
			current.jobs.some(function(_current, _index, _arr){
				if(!_current.finished){
					this.currentJob = _current;
					_current.contrib.push(this);
					exit = 1;
					return exit;
				}
			}, this);
			return exit;
		}, this);
	}
}

function User(fname, lname){
	Worker.call(this, "playerchar", 100, 16, 0);

	this.fname = fname;
	this.lname = lname;
	this.name = fname + " " + lname;
	
	this.avatar = {};

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
	this.releasedGames = [];
	this.archive = [];
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
			if(current.currentJob == ""){
				current.getJob();
			}
		});
	},
	workJobs: function(){
		this.workers.forEach(function(current, index, arr){
			if(current.currentJob != ""){
				current.currentJob.makeProgress(chance.integer({min: 1, max: 3}));
			}
		});
	},
	isAnyoneIdle: function(){
		var exit = 0;
		this.workers.some(function(current, index, arr){
			if(current.currentJob == "") exit = 1;
			return exit;
		});
		return exit;
	},
	makeSales: function(){
		this.releasedGames.forEach(function(current, index, arr){
			this.capital += (current.popularity * current.price);
			current.soldCopies += current.popularity;
			current.popularity -= 5;
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
	
	this.price = 10;
	this.soldCopies = 0;
	this.sellingTimeLeft = 100;
	this.popularity = 50;
	
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
	this.jobs = [];
	this.progress = 0;
	this.parentCompany = "none";

}

Game.prototype = {
	constructor: Game,
	generateJobs: function(){
		this.neededJobs.forEach(function(current, index, arr){
			while(current.amount){
				this.jobs.push(new Job("jobname", current.type, current.duration, current.reward));
				current.amount --;
			}
		}, this);
	},
	calcProgress:function(){
		this.progress = 0;
		this.jobs.forEach(function(current, index, arr){
			this.progress += percent(current.progress, current.duration);
		}, this);
		if(this.progress >= 100) this.publish;
	},
	publish:function(){
		console.log("published");
		this.parentCompany.releasedGames.push(this);
	}
}

function Job(name, type, duration, reward){
	this.name = name;
	this.type = type;
	this.duration = duration;
	this.progress = 0;
	this.contrib = [];
	this.reward = reward;
	this.finished = 0;
}

Job.prototype = {
	constructor: Job,
	makeProgress: function(amount){
		this.progress += amount;
		if(this.progress >= this.duration){
			this.progress = this.duration;
			this.contrib.forEach(function(current, index, arr){
				current.currentJob = "";
				current.addExp(this.reward);
				current.previousProjects.push(this);
			}, this);
			this.finished = 1;
		}
	}
}

//globals

var user = new User("Kry", "Eger");
var VERSION = "0.0";

//jquery

(function (window, $) {
	$(document).ready(function(){
		
		user.createCompany();
		user.mainCompany.developNewGame("game1");
		user.mainCompany.hire(new Worker("coder", 1, 1, 1));
		
		
		$(document).on("click", ".ls-mi-icon", function(){
			if(user.mainCompany.isAnyoneIdle()) user.mainCompany.distribJobs();
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