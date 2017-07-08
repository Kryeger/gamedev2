(function (window, $) {
	
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
		this.currentProjects = [];
		this.releasedGames = [];
	}
	
	Company.prototype = {
		constructor: Company,
		developNewGame: function(){
			this.currentProjects.push(new Game("name1"));
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
	
	$(document).ready(function(){
	
		var worldTick = setInterval(function(){
			
		}, 250);
		
	});

})(window, window.jQuery);