var Bee = function(conf) {
  this.position = {
    left: Math.random() * 70 + 10,
    top: Math.random() * 70 + 5
  };
  this.life = conf.life || 0;
  this.origLife = conf.life || 0;
  this.hit = conf.hit || 0;
  this.createBee(conf.name);
}

Bee.prototype.hitBee = function() {
  var self = this;
  self.element.className += ' hit';
  self.life -= self.hit;
  self.lifeRange.style.paddingRight = (1 - self.life/self.origLife) * 100 + '%';
  if (self.life <= 0) {
    self.die();
  }
  setTimeout(function() {
    self.element.className = self.element.className.replace(' hit', '');
  }, 200);
}

Bee.prototype.createBee= function(name) {
  this.lifeRange = document.createElement('div');
  this.element = document.createElement('div');
  this.element.appendChild(this.lifeRange);
  this.lifeRange.className = 'life-range';
  this.element.className = 'bee ' + name;
  this.element.style.left = this.position.left + '%';
  this.element.style.top = this.position.top + '%';
  this.name = name;
}

Bee.prototype.die = function() {
  var self = this;
  self.element.className += ' dead';
  beeGame.allBees.splice(beeGame.allBees.indexOf(self), 1)
}

var beeGame = (function() {
  var wrapper = null;
  var mainBtn = null;
  var frag = document.createDocumentFragment();
  var bees = [];
  var bee = null;

  function resetBees(conf) {
    var queen = null;
    document.body.className += ' new-game';
    wrapper.innerHTML = '';
    frag.innerHTML = '';
    bees.splice(0, bees.length)
    queen = new Bee({life: 100, hit: 8, name: 'queen'});
    queen.die = function() {
      setTimeout(function() {
        resetBees();
      }, 1000);
    }
    bees.push(queen);
    frag.appendChild(queen.element);

    for (var i = 0; i < conf.workers; i++) {
      bee = new Bee({life: 75, hit: 10, name: 'worker'});
      bees.push(bee);
      frag.appendChild(bee.element);
    }

    for (var i = 0; i < conf.drones; i++) {
      bee = new Bee({life: 50, hit: 12, name: 'drone'});
      bees.push(bee);
      frag.appendChild(bee.element);
    }
    wrapper.appendChild(frag);
    setTimeout(function () {
      document.body.className = '';
    }, 3000)
  }

  function init(conf) {
    wrapper = document.getElementById('wrapper');
    mainBtn = document.getElementById('mainBtn');

    mainBtn.addEventListener('click', function() {
      bees[Math.floor(Math.random() * bees.length)].hitBee();
    });
    resetBees({workers: conf.workers, drones: conf.drones});
  }

  return {
    init: init,
    allBees: bees
  }
})();

beeGame.init({
  workers: 5,
  drones: 8
});
