var Bee = function(conf) {
	this.position = {
		left: Math.random() * 90 + 5,
		top: Math.random() * 90 + 5
	};
	this.life = conf.life || 0;
	this.hit = conf.hit || 0;
	this.createBee(conf.name);
}

Bee.prototype.hitBee = function() {
	var self = this;
	self.element.className += ' hit';
	self.life -= self.hit;
	if (self.life <= 0) {
		self.die();
	}
	setTimeout(function() {	
		self.element.className = self.element.className.replace(' hit', '');
	}, 100);
}

Bee.prototype.createBee= function(name) {
	this.element = document.createElement('button');
	this.element.className = 'bee ' + name;
	this.element.style.left = this.position.left + '%';
	this.element.style.top = this.position.top + '%';
	this.name = name;
}

Bee.prototype.die = function() {
	wrapper.removeChild(this.element);
	beeGame.allBees.splice(beeGame.allBees.indexOf(this), 1)
}

var beeGame = (function() {
	var wrapper = null;
	var mainBtn = null;
	var frag = document.createDocumentFragment();
	var bees = [];
	var bee = null;

	function resetBees() {
		var queen = null;
		wrapper.innerHTML = '';
		frag.innerHTML = '';
		bees.splice(0, bees.length)
		queen = new Bee({life: 100, hit: 8, name: 'queen'});
		queen.die = function() {
			resetBees();
		}
		bees.push(queen);
		frag.appendChild(queen.element);

		for (var i = 0; i < 5; i++) {
			bee = new Bee({life: 75, hit: 10, name: 'worker'});
			bees.push(bee);
			frag.appendChild(bee.element);
		}

		for (var i = 0; i < 8; i++) {
			bee = new Bee({life: 50, hit: 12, name: 'drone'});
			bees.push(bee);
			frag.appendChild(bee.element);
		}
		wrapper.appendChild(frag);
	}

	function init() {
		wrapper = document.getElementById('wrapper');
		mainBtn = document.getElementById('mainBtn');

		mainBtn.addEventListener('click', function() {
			bees[Math.floor(Math.random() * bees.length)].hitBee();
		});
		resetBees();
	}

	return {
		init: init,
		allBees: bees
	}
})();

beeGame.init();